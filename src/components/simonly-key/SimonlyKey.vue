<template>
  <div class="container">
    <img :class="{ keyImage: true,
                   keyPressed: (pressed || externallyPressed),
                   animateBigger: (showRightKey !== null && showRightKey === position),
                   animateSmaller: (showRightKey !== null && showRightKey !== position)
                 }"
         v-on:mousedown="pressImage"
         :src="src">
    <audio ref="audio" preload="auto"></audio>
  </div>
</template>
<style scoped>
  .container {
    overflow: hidden;
  }
  .keyImage {
    position:relative;
    width: 200%;
  }
  .keyPressed {
    left:-100%;
  }

  .animateBigger {
    animation: scale2x 1s, pulse2x 1s;
    animation-delay: 0s, 1s;
    animation-iteration-count: 1, infinite;
    animation-timing-function: linear, ease-in-out;
  }

  .animateSmaller {
    animation: scaleHalf 1s;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  @keyframes scale2x {
    from {
      transform: scale(0.9, 0.9);
    }

    to {
      transform: scale(1, 1);
    }
  }

  @keyframes pulse2x {
    from {
      transform: scale(1, 1);
    }

    30% {
      transform: scale(0.95, 0.95);
    }

    60% {
      transform: scale(0.9, 0.9);
    }

    to {
      transform: scale(1, 1);
    }
  }

  @keyframes scaleHalf {
    0% {
      transform: scale(1, 1);
    }

    100% {
      transform: scale(0, 0);
    }
  }

</style>


<script>
  import { mediaPreload } from '../../lib/media-preload';

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
      type: {
        type: String,
        default() {
          return 'separate';
        },
      },
      externallyPressedKey: {
        type: Number,
        default() {
          return null;
        },
      },
      showRightKey: {
        type: Number,
        default() {
          return null;
        },
      },
    },
    computed: {
      src() {
        return `./static/key-files/${this.skin}.png`;
      },
      externallyPressed() {
        this.playAudioIf(this.externallyPressedKey === this.position);
        return this.externallyPressedKey === this.position;
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
          audio.volume = 1;
          return audio.play();
        }
        return Promise.resolve({});
      },
      stopAudio() {
        const audio = this.$refs.audio;
        const isPlaying = !audio.paused && !audio.ended
          && audio.readyState > 2;
        if (isPlaying) {
          audio.pause();
        }
      },
      pressImage() {
        if (this.showRightKey !== null) return;
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
      preloadAudio() {
        mediaPreload(`./static/key-files/${this.skin}.m4a`)
          .then((video) => {
            this.$refs.audio.src = video;
          });
      },
    },
    mounted() {
      this.preloadAudio();
      const audio = this.$refs.audio;
      if (audio && audio.load) {
        audio.load();
      }
    },
  };
</script>
