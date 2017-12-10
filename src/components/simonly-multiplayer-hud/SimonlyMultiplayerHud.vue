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


  import { byDesc, byNot } from '../../lib/arrays';

  export default {
    name: 'simonly-multiplayer-hud',
    ioc: ['multiplayerHudQueries', 'simonlyMultiplayer'],
    computed: {
      sortedPlayers() {
        if (!this.players) return [];
        const myId = this.simonlyMultiplayer.getUserId();
        const playersWithoutMe = this.players.filter(byNot('userId', myId));
        return playersWithoutMe.sort(byDesc('score'));
      },
    },
    firebase() {
      return {
        players: this.multiplayerHudQueries.players(),
      };
    },
  };
</script>
