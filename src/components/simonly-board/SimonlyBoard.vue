<template>
  <div class="simonly-board">
    <simonly-welcome v-if="currentState === 'welcome'" :onClick="preloadAndStart"></simonly-welcome>
    <simonly-go321 v-if="currentState === '321'"></simonly-go321>
    <simonly-score class="score" :score="simonlyLocalUI.score"></simonly-score>
    <simonly-hall-of-fame :score="simonlyLocalUI.score"  v-if="currentState === 'hall-of-fame'" class="hall-of-fame"></simonly-hall-of-fame>
    <simonly-keys :numKeys="config.numKeys" :class="{ 'simonly-keys': true, 'slide-when-hall-of-fame' : (currentState === 'hall-of-fame') }" v-show="currentState === 'playing' || currentState === 'hall-of-fame' " :whenUserPress="userPressed" :simonlyUI="simonlyLocalUI"></simonly-keys>

    <simonly-music :track="currentState"></simonly-music>
    <audio src="./static/audio/round-ko.mp3" ref="roundKoAudio"></audio>
    <audio src="./static/audio/round-ok.mp3" ref="roundOkAudio"></audio>

    <simonly-multiplayer-hud class="multiplayer-hud" v-if="isAtState(['321','playing'])"></simonly-multiplayer-hud>
    <simonly-gameover :onClick="restart" v-if="currentState === 'hall-of-fame'" class="game-over"></simonly-gameover>
    <simonly-explain v-if="config.hidePubli === 0"></simonly-explain>
  </div>
</template>
<style scoped src="./SimonlyBoard.css"></style>


<script>
  import Firebase from 'firebase';
  import SimonlyGameover from '../../components/simonly-gameover/SimonlyGameover.vue';
  import SimonlyScore from '../../components/simonly-score/SimonlyScore.vue';
  import SimonlyMusic from '../../components/simonly-music/SimonlyMusic.vue';
  import SimonlyKeys from '../../components/simonly-keys/SimonlyKeys.vue';
  import SimonlyHallOfFame from '../../components/simonly-hall-of-fame/SimonlyHallOfFame.vue';
  import SimonlyGo321 from '../../components/simonly-go321/SimonlyGo321.vue';
  import SimonlyWelcome from '../../components/simonly-welcome/SimonlyWelcome.vue';
  import SimonlyExplain from '../../components/simonly-explain/SimonlyExplain.vue';
  import SimonlyMultiplayerHud from '../../components/simonly-multiplayer-hud/SimonlyMultiplayerHud.vue';

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
    ioc: ['simonlyLocalUI', 'simonlyGame', 'config'],
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
      isAtState(states) {
        return states.indexOf(this.currentState) >= 0;
      },
    },
    mounted() {
      this.currentState = STATES.WELCOME;
      this.simonlyLocalUI.setOkAudio(this.$refs.roundOkAudio);
      this.simonlyLocalUI.setKoAudio(this.$refs.roundKoAudio);
      this.$watch('simonlyLocalUI.theRightKey', () => {
        if (this.simonlyLocalUI.theRightKey) {
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
