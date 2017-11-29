<template>
  <div class="simonly-score">
    <p :class="{ animationTada: animating }">{{ score }}</p>

  </div>
</template>
<style scoped>
  .simonly-score {
    background-color:#fff;
    width: 10vw;
    height: 10vw;
    border-radius: 50%;
  }
  .simonly-score p {
    display:block;
    color: #f5991b;
    text-shadow: 0.5vw 0.5vw #c82f27, 1vw 1vw #6c100f;
    font-weight:bold;
    font-size: 5vw;
    margin-top:0vh;
    margin-left:-0.5vw;
    line-height: 10vw;
  }

  @keyframes tada {
    from {
      transform: scale3d(1, 1, 1);
    }

    to {
      transform: scale3d(2, 2, 2);
      opacity: 0.3;
    }
  }

  .animationTada {
    animation-name: tada;
    animation-duration: 0.2s;
  }

</style>


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
