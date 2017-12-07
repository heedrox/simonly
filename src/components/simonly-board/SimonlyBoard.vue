<template>
  <div class="simonly-board">
    <simonly-welcome v-if="currentState === 'welcome'" :onClick="preloadAndStart"></simonly-welcome>
    <simonly-go321 v-if="currentState === '321'"></simonly-go321>
    <simonly-score class="score" :score="simonlyUI.score"></simonly-score>
    <simonly-keys :class="{ 'simonly-keys': true, 'slide-when-hall-of-fame' : (currentState === 'hall-of-fame') }" v-show="currentState === 'playing' || currentState === 'hall-of-fame' " :whenUserPress="userPressed" :simonlyUI="simonlyUI"></simonly-keys>
    <simonly-hall-of-fame :score="simonlyUI.score"  v-if="currentState === 'hall-of-fame'" class="hall-of-fame"></simonly-hall-of-fame>
    <simonly-music :track="currentState"></simonly-music>
    <audio src="./static/audio/round-ko.mp3" ref="roundKoAudio"></audio>
    <audio src="./static/audio/round-ok.mp3" ref="roundOkAudio"></audio>

    <div v-if="currentState === 'hall-of-fame'" :class="{ 'game-over': true, 'shown-hall-of-fame' : (currentState === 'hall-of-fame') }">
      <p class="bounce">GAME OVER :(</p>
      <simonly-button :onClick="restart" button="replay"></simonly-button>
    </div>
  </div>
</template>
<style scoped>
  .simonly-board {
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  .simonly-keys {
    padding-top: 30vh;
  }

  .score {
    position:absolute;
    top:2vh;
    right:2vw;
  }

  .game-over {
    display:flex;
    flex-direction: row;
    flex-wrap:nowrap;
    color: #f4dd06;
    text-shadow: 0.5vw 0.5vw #f5991b, 0.8vw 0.8vw #c82f27, 1vw 1vw #6c100f;
    font-weight:bold;
    font-size: 5vh;
    letter-spacing: 0.8vw;
    position: fixed;
    bottom: 3vh;
    width: 100%;
  }
  .game-over p {
    flex-grow: 2;
  }
  .game-over > div {
    flex-grow: 2;
  }

  .hall-of-fame {
    padding-top: 5vh;
    margin:auto;
    width:100%;
    animation: slideInRight 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

  }

  .slide-when-hall-of-fame {
    animation: slideOutLeft 3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    position:absolute;
  }
  .bounce {
    animation: bounce 6s infinite;
  }
  @keyframes bounce {
    3% {
      transform: scale(1.2);
      opacity: 1;
    }
    7% {
      transform: scale(0.9);
      opacity: 1
    }
    10% {
      transform: scale(1.05)
    }
    13% {
      transform: scale(0.95)
    }
    17% {
      transform: scale(1);
    }
    42% {
      transform: scale(1);
    }
    45% {
      transform: scale(1.2)
    }
    48% {
      transform: scale(0.8);
    }
    52% {
      transform: scale(1);
    }
  }

  @keyframes slideOutLeft {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      display: none;
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes slideInRight {
    from {
      transform: translate3d(100%, 0, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }



</style>


<script>
  // import screenfull from 'screenfull';
  import Firebase from 'firebase';
  import SimonlyButton from '../../components/simonly-button/SimonlyButton.vue';
  import SimonlyScore from '../../components/simonly-score/SimonlyScore.vue';
  import SimonlyMusic from '../../components/simonly-music/SimonlyMusic.vue';
  import SimonlyKeys from '../../components/simonly-keys/SimonlyKeys.vue';
  import SimonlyHallOfFame from '../../components/simonly-hall-of-fame/SimonlyHallOfFame.vue';
  import SimonlyGo321 from '../../components/simonly-go321/SimonlyGo321.vue';
  import SimonlyWelcome from '../../components/simonly-welcome/SimonlyWelcome.vue';

  import autoPlayerHack from '../../lib/auto-player-hack';
  import { db } from '../../lib/db-firebase';
  import config from '../../config';

  const STATES = {
    WELCOME: 'welcome',
    PLAYING: 'playing',
    HALL_OF_FAME: 'hall-of-fame',
    GO321: '321',
  };

  export default {
    name: 'simonly-board',
    ioc: ['simonlyUI', 'simonlyGame'],
    components: {
      SimonlyScore,
      SimonlyButton,
      SimonlyMusic,
      SimonlyKeys,
      SimonlyHallOfFame,
      SimonlyGo321,
      SimonlyWelcome,
    },
    data() {
      return {
        currentState: STATES.WELCOME,
      };
    },
    props: {},
    methods: {
      restart() {
        this.currentState = STATES.GO321;
        setTimeout(() => {
          this.currentState = STATES.PLAYING;
          this.simonlyGame.start();
        }, 3000);
      },
      preloadAndStart() {
        const audios = window.document.getElementsByTagName('audio');
        autoPlayerHack(audios);
        this.restart();
      },
      userPressed(key) {
        this.simonlyGame.userPressed(key);
      },
    },
    mounted() {
      this.currentState = STATES.WELCOME;
      this.simonlyUI.setOkAudio(this.$refs.roundOkAudio);
      this.simonlyUI.setKoAudio(this.$refs.roundKoAudio);
      /* if (screenfull.enabled) {
        screenfull.request();
      } */
      this.$watch('simonlyUI.theRightKey', () => {
        if (this.simonlyUI.theRightKey) {
          setTimeout(() => {
            this.currentState = STATES.HALL_OF_FAME;
          }, 1500);
        }
      });
      // since I can connect from multiple devices or browser tabs,
      // we store each connection instance separately
      // any time that connectionsRef's value is null (i.e. has no children) I am offline
      const myConnectionsRef = db.ref(`${config.nameOfFamily}/joe/connections`);

      // stores the timestamp of my last disconnect (the last time I was seen online)
      const lastOnlineRef = db.ref(`${config.nameOfFamily}/joe/lastOnline`);

      const connectedRef = db.ref('.info/connected');
      connectedRef.on('value', (snap) => {
        if (snap.val() === true) {
          // We're connected (or reconnected)! Do anything
          // here that should happen only if online (or on reconnect)
          const con = myConnectionsRef.push();

          // When I disconnect, remove this device
          con.onDisconnect().remove();

          // Add this device to my connections list
          // this value could contain info about the device or a timestamp too
          con.set({ userAgent: window.navigator.userAgent });

          // When I disconnect, update the last time I was seen online
          lastOnlineRef.onDisconnect().set(Firebase.database.ServerValue.TIMESTAMP);
        }
      });
    },
  };
</script>
