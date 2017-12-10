<template>
  <div class="simonly-multiplayer-hud">
    <div v-if="sortedPlayers.length > 0">
      <div class="line"> - Juegan contigo - </div>
      <ul>
        <li v-for="(row, index) in sortedPlayers" :key="index">
          <span class="badge">{{index + 1}}</span> {{row.name}}: {{row.score}}
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
    ioc: ['multiplayerHudQueries'],
    computed: {
      sortedPlayers() {
        return this.players ? this.players.sort(byDesc('score')) : [];
      },
    },
    firebase() {
      return {
        players: this.multiplayerHudQueries.players(),
      };
    },
  };
</script>
