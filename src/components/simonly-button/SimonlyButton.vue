<template>
  <div class="simonly-button">
    <INPUT type="submit" name="" value="" @click="click"
           :class="button"
           />
    <audio src="./static/audio/button-press.mp3" ref="clickAudio"></audio>
  </div>
</template>
<style scoped src="./SimonlyButton.css"></style>


<script>
  export default {
    name: 'simonly-button',
    props: {
      button: {
        type: String,
        default() {
          return 'play';
        },
      },
      onClick: {
        type: Function,
      },
    },
    methods: {
      click() {
        this.$refs.clickAudio.play();
        setTimeout(() => {
          this.onClick();
        }, 500);
      },
    },
  };
</script>
