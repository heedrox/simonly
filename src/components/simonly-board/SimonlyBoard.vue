<template>
  <div class="simonly-board">
    <simonly-waiting-for-players v-if="currentState === 'waiting-for-players'" @players:ready="waitForOthersReadyCallback"></simonly-waiting-for-players>
    <simonly-welcome v-if="currentState === 'welcome'" :onClick="preloadAndStart"></simonly-welcome>
    <simonly-go321 v-if="currentState === '321'"></simonly-go321>
    <simonly-score class="score" :score="simonlyLocalUI.score"></simonly-score>
    <simonly-hall-of-fame :score="simonlyLocalUI.score" v-if="currentState === 'hall-of-fame'"
                          class="hall-of-fame"></simonly-hall-of-fame>
    <simonly-keys :numKeys="config.numKeys"
                  :class="{ 'simonly-keys': true, 'slide-when-hall-of-fame' : (currentState === 'hall-of-fame') }"
                  v-show="currentState === 'playing' || currentState === 'hall-of-fame' " :whenUserPress="userPressed"
                  :simonlyUI="simonlyLocalUI"></simonly-keys>

    <simonly-music :track="getMusicTrack"></simonly-music>
    <audio id="roundKoAudio" src="./static/audio/round-ko.mp3" ref="roundKoAudio"></audio>
    <audio id="roundOkAudio" src="./static/audio/round-ok.mp3" ref="roundOkAudio"></audio>

    <simonly-multiplayer-hud class="multiplayer-hud" v-if="isAtState(['321','playing'])" :numTurn="simonlyGame.gameInfo.numTurn"></simonly-multiplayer-hud>
    <simonly-gameover :onClick="restart" v-if="currentState === 'hall-of-fame'" class="game-over"></simonly-gameover>
    <simonly-explain v-if="config.hidePubli === 0"></simonly-explain>
  </div>
</template>
<style scoped src="./SimonlyBoard.css"></style>


<script>
  /* eslint-disable no-unused-vars,arrow-body-style */

  import SimonlyGameover from '../../components/simonly-gameover/SimonlyGameover.vue';
  import SimonlyScore from '../../components/simonly-score/SimonlyScore.vue';
  import SimonlyMusic from '../../components/simonly-music/SimonlyMusic.vue';
  import SimonlyKeys from '../../components/simonly-keys/SimonlyKeys.vue';
  import SimonlyHallOfFame from '../../components/simonly-hall-of-fame/SimonlyHallOfFame.vue';
  import SimonlyGo321 from '../../components/simonly-go321/SimonlyGo321.vue';
  import SimonlyWelcome from '../../components/simonly-welcome/SimonlyWelcome.vue';
  import SimonlyExplain from '../../components/simonly-explain/SimonlyExplain.vue';
  import SimonlyMultiplayerHud from '../../components/simonly-multiplayer-hud/SimonlyMultiplayerHud.vue';
  import SimonlyWaitingForPlayers from '../../components/simonly-waiting-for-players/SimonlyWaitingForPlayers.vue';


  import autoPlayerHack from '../../lib/auto-player-hack';

  const STATES = {
    WELCOME: 'welcome',
    PLAYING: 'playing',
    HALL_OF_FAME: 'hall-of-fame',
    GO321: '321',
    WAITING_FOR_PLAYERS: 'waiting-for-players',
  };

  export default {
    name: 'simonly-board',
    ioc: ['simonlyLocalUI', 'simonlyGame', 'config', 'simonlyStorage', 'simonlyMultiplayer'],
    components: {
      SimonlyScore,
      SimonlyGameover,
      SimonlyMusic,
      SimonlyKeys,
      SimonlyHallOfFame,
      SimonlyGo321,
      SimonlyWelcome,
      SimonlyExplain,
      SimonlyMultiplayerHud,
      SimonlyWaitingForPlayers,
    },
    data() {
      return {
        currentState: STATES.WELCOME,
      };
    },
    props: {},
    methods: {
      restart() {
        this.setMultiplayerPresence()
          .then(() => this.waitForOthers());
      },
      waitForOthers() {
        return this.updateState(STATES.WAITING_FOR_PLAYERS);
      },
      waitForOthersReadyCallback() {
        this.show321AndStart();
      },
      show321AndStart() {
        this.currentState = STATES.GO321;
        setTimeout(() => {
          this.updateState(STATES.PLAYING)
            .then(() => this.simonlyGame.start());
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
      isAtState(states) {
        return states.indexOf(this.currentState) >= 0;
      },
      setMultiplayerPresence() {
        return this.simonlyStorage.get('name')
          .then(name => this.simonlyMultiplayer.setPresence(name));
      },
      updateState(state) {
        this.currentState = state;
        return this.simonlyMultiplayer.updateState(state);
      },
      setAudiosInLocalUI() {
        this.simonlyLocalUI.setOkAudio(this.$refs.roundOkAudio);
        this.simonlyLocalUI.setKoAudio(this.$refs.roundKoAudio);
      },
      fixSuperStrangeBugSomethingOverwritingAudios() {
        // dont know why, but something after welcome state overwrites audio
        // changes ok - ko audios. No idea why, but lost lots of time debugging :(
        // this could be a super cool test if you want to prove yourself XD
        setInterval(() => {
          this.setAudiosInLocalUI();
        }, 2000);
      },
    },
    computed: {
      getMusicTrack() {
        if (this.currentState === STATES.WAITING_FOR_PLAYERS) return STATES.WELCOME;
        if (this.currentState === STATES.GO321) return STATES.WELCOME;
        return this.currentState;
      },
    },
    mounted() {
      this.simonlyMultiplayer.updateState(STATES.WELCOME);
      this.setAudiosInLocalUI();
      this.fixSuperStrangeBugSomethingOverwritingAudios();
      this.$watch('simonlyLocalUI.theRightKey', () => {
        if (this.simonlyLocalUI.theRightKey) {
          setTimeout(() => {
            this.currentState = STATES.HALL_OF_FAME;
          }, 1500);
        }
      });
    },
  };
</script>
