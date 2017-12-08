<template>
  <div class="simonly-score">
    <p :class="{ animationTada: animating }">{{ score }}</p>
  </div>
</template>
<style scoped src="./SimonlyScore.css"></style>

<script>
  export default {
    name: 'simonly-score',
    components: {
    },
    data() {
      return {
        animating: false,
      };
    },
    props: {
      score: {
        type: Number,
        default: 0,
      },
    },
    methods: {

    },
    watch: {
      score() {
        this.animating = true;
        setTimeout(() => {
          this.animating = false;
        }, 200);
      },
    },
  };
</script>
