<template>
  <div>
    <img class="keyImage"
         v-on:mousedown="pressImage"
         v-on:touchstart="pressImage"
         v-on:mouseup="releaseImage"
         v-on:touchend="releaseImage"
         :src="(pressed || externallyPressed) ? skinOn : skinOff">
    <audio ref="audio" :src="'/static/key-files/'+skin+'.m4a'"></audio>
  </div>
</template>
<style scoped>
  .keyImage {
    width: 100%;
  }
</style>


<script>
  export default {
    name: 'simonly-key',
    data() {
      return {
        pressed: false,
      };
    },
    props: {
      position: {
        type: Number,
        default() {
          return 1;
        },
      },
      skin: {
        type: String,
        default() {
          return '';
        },
      },
      gameInfo: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    computed: {
      externallyPressed() {
        this.playAudioIf(this.gameInfo.pressed === this.position);
        return this.gameInfo.pressed === this.position;
      },
      skinOn() {
        return `/static/key-files/${this.skin}-on.png`;
      },
      skinOff() {
        return `/static/key-files/${this.skin}-off.png`;
      },
    },
    methods: {
      playAudioIf(isPressed) {
        const audio = this.$refs.audio;
        if (audio && isPressed && audio.paused && audio.play) {
          audio.currentTime = 0;
          audio.play();
        } else if (audio && !isPressed && !audio.paused && audio.pause) {
          audio.pause();
        }
      },
      pressImage() {
        this.pressed = true;
        this.playAudioIf(this.pressed);
        this.$emit('keypress', { key: this.position });
      },
      releaseImage() {
        this.pressed = false;
        this.playAudioIf(this.pressed);
      },
    },
  };
</script>
