<template>
  <div class="simonly-board">
    <div v-if="welcomeState" class="game-welcome">
      <p>WELCOME!</p>
      <simonly-button :onClick="restart"></simonly-button>
    </div>
    <simonly-music :track="getTrack()"></simonly-music>
    <div v-show="!welcomeState" class="simonly-keys">
      <simonly-key class="key" :position="1" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="maria">
      </simonly-key>
      <simonly-key class="key" :position="2" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="other">
      </simonly-key>
      <simonly-key class="key" :position="3" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="ines">
      </simonly-key>
      <simonly-key class="key" :position="4" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="other">
      </simonly-key>
      <simonly-key class="key" :position="5" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="other">
      </simonly-key>
      <simonly-key class="key" :position="6" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="jorge">
      </simonly-key>
      <simonly-key class="key" :position="7" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="other">
      </simonly-key>
      <simonly-key class="key" :position="8" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="other">
      </simonly-key>
    </div>

    <simonly-score class="score" :score="game.gameInfo.score"></simonly-score>

    <div v-if="game.gameInfo.failed" class="game-over">
      <p>GAME OVER :(</p>
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
    display:block;
    color: #f4dd06;
    text-shadow: 0.5vw 0.5vw #f5991b, 0.8vw 0.8vw #c82f27, 1vw 1vw #6c100f;
    font-weight:bold;
    font-size: 5vh;
    margin-top: 10vh;
    letter-spacing: 0.8vw;
  }

</style>


<script>
  // import screenfull from 'screenfull';
  import SimonlyButton from '../../components/simonly-button/SimonlyButton.vue';
  import SimonlyKey from '../../components/simonly-key/SimonlyKey.vue';
  import SimonlyScore from '../../components/simonly-score/SimonlyScore.vue';
  import SimonlyMusic from '../../components/simonly-music/SimonlyMusic.vue';

  import Game from '../../game-lib/game';

  export default {
    name: 'simonly-board',
    components: {
      SimonlyKey,
      SimonlyScore,
      SimonlyButton,
      SimonlyMusic,
    },
    data() {
      return {
        game: new Game(),
        welcomeState: true,
      };
    },
    props: {},
    methods: {
      userPressed(ev) {
        this.game.userPressed(ev.key);
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
