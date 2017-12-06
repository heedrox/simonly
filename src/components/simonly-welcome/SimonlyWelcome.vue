<template>

<div class="game-welcome">
  <p class="title bounce">WELCOME!</p>
  <p><input placeholder="Enter your name" type="text" v-model="name"></p>
  <simonly-button :onClick="clickPlay"></simonly-button>
</div>

</template>
<style scoped>
  .game-welcome {
    display:block;
    margin-top: 20vh;
  }
  .game-welcome p {
    margin: 10vh;
  }
  .game-welcome p.title {
    color: #f4dd06;
    text-shadow: 0.5vw 0.5vw #f5991b, 0.8vw 0.8vw #c82f27, 1vw 1vw #6c100f;
    font-weight:bold;
    font-size: 15vh;
    letter-spacing: 0.8vw;
  }

  .game-welcome p input {
    color: #c82f27;
    letter-spacing: 0.8vw;
    font-size: 8vh;
    text-align: center;
    padding: 2.5vh;
    margin: 0vh;
    border-radius: 5vh;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 2px solid #f5991b;
  }

  .game-welcome p input:focus {
    color: #c82f27;
    letter-spacing: 0.8vw;
    font-size: 8vh;
    text-align: center;
    padding: 2.5vh;
    margin: 0vh;
    border-radius: 5vh;
    -webkit-appearance: none;
    -moz-appearance: none;
    box-shadow: 0 0 6px 6px #f5991b;
    outline: none;
  }

  .bounce {
    animation: bounce 6s infinite;
  }
</style>
<script>
  import SimonlyButton from '../simonly-button/SimonlyButton.vue';
  import SimonlyStorage from '../../game-lib/SimonlyStorage';

  export default {
    name: 'simonly-welcome',
    components: {
      SimonlyButton,
    },
    data() {
      return {
        simonlyStorage: new SimonlyStorage(),
        name: '',
      };
    },
    props: {
      onClick: null,
    },
    methods: {
      clickPlay() {
        if (!this.name) return;
        this.simonlyStorage.set('name', this.name)
          .then(() => {
            this.onClick();
          });
      },
    },
    mounted() {
      this.simonlyStorage.get('name')
        .then((value) => {
          this.name = value;
        });
    },
  };
</script>
