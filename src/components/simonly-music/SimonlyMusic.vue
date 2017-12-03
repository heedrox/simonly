<template>
  <div class="simonly-music">
    <audio ref="backgroundAudio"
           :src="getBackgroundAudioName"></audio>
  </div>
</template>
<style scoped>

</style>


<script>
  export default {
    name: 'simonly-music',
    components: {},
    data() {
      return {};
    },
    props: {
      track: {
        type: String,
        default() {
          return 'title';
        },
      },
    },
    methods: {},
    computed: {
      getBackgroundAudioName() {
        return `./static/audio/${this.track}-music.mp3`;
      },
    },
    watch: {
      track() {
// eslint-disable-next-line no-console
        console.log('track changed!');
      },
      getBackgroundAudioName() {
        const audio = this.$refs.backgroundAudio;
        const isPlaying = audio && audio.currentTime > 0 && !audio.paused && !audio.ended
          && audio.readyState > 2;
        if (isPlaying) {
// eslint-disable-next-line no-console
          console.log('paused');
          audio.pause();
        }
        if (audio && audio.load && audio.play) {
// eslint-disable-next-line no-console
          console.log('playing back');
          setTimeout(() => {
            audio.currentTime = 0;
            audio.volume = 0.3;
            audio.load();
            audio.play();
          }, 1000);
        }
      },
    },
    mounted() {
// eslint-disable-next-line no-console
      console.log('mounted');
      if (this.$refs.backgroundAudio && this.$refs.backgroundAudio.play) {
        this.$refs.backgroundAudio.volume = 0.3;
        this.$refs.backgroundAudio.play();
      }
    },
  };
</script>
