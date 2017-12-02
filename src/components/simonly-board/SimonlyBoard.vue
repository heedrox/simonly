<template>
  <div class="simonly-board">
    <div v-if="welcomeState" class="game-welcome">
      <p class="bounce">WELCOME!</p>
      <simonly-button :onClick="restart"></simonly-button>
    </div>
    <simonly-keys class="simonly-keys" v-show="!welcomeState" :game="game" :simonlyUI="simonlyUI"></simonly-keys>
    <simonly-music :track="getTrack()"></simonly-music>
    <simonly-score class="score" :score="game.gameInfo.score"></simonly-score>
    <audio src="./static/audio/round-ko.mp3" ref="roundKoAudio"></audio>
    <audio src="./static/audio/round-ok.mp3" ref="roundOkAudio"></audio>

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
  import SimonlyScore from '../../components/simonly-score/SimonlyScore.vue';
  import SimonlyMusic from '../../components/simonly-music/SimonlyMusic.vue';
  import SimonlyKeys from '../../components/simonly-keys/SimonlyKeys.vue';

  import SimonlyGame from '../../game-lib/SimonlyGame';
  import SimonlyUI from '../../game-lib/SimonlyUI';

  export default {
    name: 'simonly-board',
    components: {
      SimonlyScore,
      SimonlyButton,
      SimonlyMusic,
      SimonlyKeys,
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
      this.game.simonlyUI.setOkAudio(this.$refs.roundOkAudio);
      this.game.simonlyUI.setKoAudio(this.$refs.roundKoAudio);
      /* if (screenfull.enabled) {
        screenfull.request();
      } */
    },
  };
</script>
