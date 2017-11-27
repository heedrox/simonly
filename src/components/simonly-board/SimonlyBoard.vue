<template>
  <div class="simonly-board">
    <div v-if="welcomeState" class="game-welcome">
      <p class="bounce">WELCOME!</p>
      <simonly-button :onClick="restart"></simonly-button>
    </div>
    <simonly-music :track="getTrack()"></simonly-music>
    <div v-show="!welcomeState" class="simonly-keys">
      <simonly-key class="key" :position="1" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="maria">
      </simonly-key>
      <simonly-key class="key" :position="2" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="jone">
      </simonly-key>
      <simonly-key class="key" :position="3" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="ines">
      </simonly-key>
      <simonly-key class="key" :position="4" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="inigo">
      </simonly-key>
      <simonly-key class="key" :position="5" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="olatz">
      </simonly-key>
      <simonly-key class="key" :position="6" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="jorge">
      </simonly-key>
      <simonly-key class="key" :position="7" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="irene">
      </simonly-key>
      <simonly-key class="key" :position="8" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="mariatxiki">
      </simonly-key>
    </div>

    <simonly-score class="score" :score="game.gameInfo.score"></simonly-score>
    <audio src="/static/audio/round-ko.mp3" ref="roundKoAudio"></audio>
    <audio src="/static/audio/round-ok.mp3" ref="roundOkAudio"></audio>

    <div v-if="game.gameInfo.failed" class="game-over">
      <p class="bounce">GAME OVER :(</p>
      <simonly-button :onClick="restart" button="replay"></simonly-button>
    </div>
  </div>
</template>
<style scoped>
  .game-welcome {
    display:block;
    margin-top: 20vh;
  }
  .game-welcome p {
    color: #f4dd06;
    text-shadow: 0.5vw 0.5vw #f5991b, 0.8vw 0.8vw #c82f27, 1vw 1vw #6c100f;
    font-weight:bold;
    font-size: 15vh;
    letter-spacing: 0.8vw;
  }

  .simonly-board {
    height: 100%;
    width: 100%;
  }

  .simonly-keys {
    padding-top: 30vh;
  }

  .key {
    display: inline-block;
    width: 11vw;
    max-width: 11vw;
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
    margin-top: 10vh;
    letter-spacing: 0.8vw;
  }
  .game-over p {
    flex-grow: 2;
  }
  .game-over > div {
    flex-grow: 2;
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
</style>


<script>
  // import screenfull from 'screenfull';
  import SimonlyButton from '../../components/simonly-button/SimonlyButton.vue';
  import SimonlyKey from '../../components/simonly-key/SimonlyKey.vue';
  import SimonlyScore from '../../components/simonly-score/SimonlyScore.vue';
  import SimonlyMusic from '../../components/simonly-music/SimonlyMusic.vue';

  import SimonlyGame from '../../game-lib/SimonlyGame';
  import SimonlyUI from '../../game-lib/SimonlyUI';

  export default {
    name: 'simonly-board',
    components: {
      SimonlyKey,
      SimonlyScore,
      SimonlyButton,
      SimonlyMusic,
    },
    data() {
      const ui = new SimonlyUI();
      return {
        simonlyUI: ui,
        game: new SimonlyGame(ui),
        welcomeState: true,
      };
    },
    props: {},
    methods: {
      userPressed(ev) {
        this.game.userPressed(ev.key);
        if (this.game.gameInfo.failed) {
          this.$refs.roundKoAudio.play();
        }
      },
      restart() {
        this.welcomeState = false;
        this.game.start();
      },
      getTrack() {
        return !this.welcomeState ? 'game' : 'title';
      },
    },
    mounted() {
      this.welcomeState = true;
      this.game.numTurn = 0;
      /* if (screenfull.enabled) {
        screenfull.request();
      } */
    },
  };
</script>
