<template>
  <div>
    <div v-if="sortedPlayers.length > 0">
      <div class="line"> - Juegan contigo - </div>
      <ul>
        <li v-for="(row, index) in sortedPlayers" :key="index">
          <span class="badge">{{index}}</span> {{players.name}}: {{players.score}}
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped src="./SimonlyMultiplayerHud.css"></style>
<script>


  import { byDesc } from '../../lib/arrays';

  export default {
    name: 'simonly-multiplayer-hud',
    ioc: ['multiplayerQueries'],
    computed: {
      sortedPlayers() {
        return [] || this.players.sort(byDesc('score'));
      },
    },
    firebase() {
      return {
        players: this.multiplayerQueries.players(),
      };
    },
  };
</script>
