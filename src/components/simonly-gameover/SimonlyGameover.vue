<template>
  <div class="simonly-gameover">
    <p class="bounce">GAME OVER :(</p>
    <simonly-button :onClick="doClick" button="replay"></simonly-button>
  </div>
</template>
<style scoped>
  .simonly-gameover {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .simonly-gameover p {
    flex-grow: 2;
    color: #f4dd06;
    text-shadow: 0.5vw 0.5vw #f5991b, 0.8vw 0.8vw #c82f27, 1vw 1vw #6c100f;
    font-weight: bold;
    font-size: 5vh;
    letter-spacing: 0.8vw;
    margin-top: 6vh;
  }

  .simonly-gameover > div {
    flex-grow: 2;
  }

  .bounce {
    animation: bounce 6s infinite;
  }

</style>

<script>
  import SimonlyButton from '../simonly-button/SimonlyButton.vue';

  export default {
    name: 'simonly-gameover',
    components: {
      SimonlyButton,
    },
    props: {
      onClick: null,
    },
    methods: {
      doClick() {
        this.onClick();
      },
    },
  };
</script>
