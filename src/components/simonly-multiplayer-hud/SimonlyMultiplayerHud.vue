<template>
  <div class="simonly-multiplayer-hud">
    <div v-if="sortedPlayers.length > 1">
      <div class="line"> - Now Playing - </div>
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
    ioc: ['simonlyMultiplayer'],
    computed: {
      sortedPlayers() {
        if (!this.players) return [];
        return this.players.sort(byDesc('score'));
      },
    },
    firebase() {
      return {
        players: this.simonlyMultiplayer.getPlayers(),
      };
    },
  };
</script>
