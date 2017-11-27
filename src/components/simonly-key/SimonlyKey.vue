<template>
  <div>
    <img class="keyImage"
         v-on:mousedown="pressImage"
         :src="(pressed || externallyPressed) ? skinOn : skinOff">
    <audio ref="audio" :src="'/static/key-files/'+skin+'.m4a'" preload="auto"></audio>
  </div>
</template>
<style scoped>
  .keyImage {
    width: 100%;
  }
</style>


<script>

  const TIME_PER_KEY = 600;

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
      externallyPressedKey: {
        type: Number,
        default() {
          return null;
        },
      },
    },
    computed: {
      externallyPressed() {
        this.playAudioIf(this.externallyPressedKey === this.position);
        return this.externallyPressedKey === this.position;
      },
      skinOn() {
        return `/static/key-files/${this.skin}-on.png`;
      },
      skinOff() {
        return `/static/key-files/${this.skin}-off.png`;
      },
    },
    methods: {
      playAudioIf(condition) {
        if (condition) {
          this.playAudio()
            .then(() => {
              setTimeout(() => {
                this.stopAudio();
              }, TIME_PER_KEY);
            });
        }
      },
      playAudio() {
        const audio = this.$refs.audio;
        if (audio && audio.play) {
          audio.currentTime = 0;
          return audio.play();
        }
        return Promise.resolve({});
      },
      stopAudio() {
        const audio = this.$refs.audio;
        const isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended
          && audio.readyState > 2;
        if (isPlaying) {
          audio.pause();
        }
      },
      pressImage() {
        this.playAudio()
          .then(() => {
            this.pressed = true;
            setTimeout(() => {
              this.releaseImage();
            }, TIME_PER_KEY);
          });
      },
      releaseImage() {
        this.pressed = false;
        this.stopAudio();
        this.$emit('keypress', { key: this.position });
      },
    },
    mounted() {
      const audio = this.$refs.audio;
      if (audio && audio.load) {
        audio.load();
      }
    },
  };
</script>
