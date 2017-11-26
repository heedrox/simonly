<template>
  <div class="simonly-board">
    <div class="simonly-keys">
      <simonly-key class="key" :position="1" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="maria">
      </simonly-key>
      <simonly-key class="key" :position="2" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="jorge">
      </simonly-key>
      <simonly-key class="key" :position="3" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="ines">
      </simonly-key>
      <simonly-key class="key" :position="4" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="jorge">
      </simonly-key>
      <simonly-key class="key" :position="5" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="jorge">
      </simonly-key>
      <simonly-key class="key" :position="6" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="jorge">
      </simonly-key>
      <simonly-key class="key" :position="7" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="jorge">
      </simonly-key>
      <simonly-key class="key" :position="8" :game-info="game.gameInfo" @keypress="userPressed"
                   skin="jorge">
      </simonly-key>
    </div>

    <simonly-score class="score" :score="game.gameInfo.score"></simonly-score>

    <div v-if="game.gameInfo.failed">
      <p>GAME OVER :(</p>
      <input type="button" value="RESTART" v-on:click="restart()">
    </div>
  </div>
</template>
<style scoped>
  .simonly-board {
    background: url(background.jpg) center;
    background-size: cover;
    height: 100%;
    width: 100%;
  }

  .simonly-keys {
    padding-top: 20vh;
  }

  .key {
    display: inline-block;
    width: 10vw;
    max-width: 10vw;
  }

  .score {
    position:absolute;
    top:2vh;
    right:2vw;
  }
</style>


<script>
  import SimonlyKey from '../../components/simonly-key/SimonlyKey.vue';
  import SimonlyScore from '../../components/simonly-score/SimonlyScore.vue';
  import Game from '../../game-lib/game';

  export default {
    name: 'simonly-board',
    components: {
      SimonlyKey,
      SimonlyScore,
    },
    data() {
      return {
        game: new Game(),
      };
    },
    props: {},
    methods: {
      userPressed(ev) {
        this.game.userPressed(ev.key);
      },
      restart() {
        this.game.start();
      },
    },
    mounted() {
      this.game.start();
    },
  };
</script>
