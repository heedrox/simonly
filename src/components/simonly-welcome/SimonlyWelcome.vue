<template>

<div class="game-welcome">
  <p class="title bounce">WELCOME!</p>
  <p class="namerow"><input placeholder="Enter your name" type="text" v-model="name"></p>
  <simonly-button class="playButton" :onClick="clickPlay"></simonly-button>
</div>

</template>
<style scoped src="./SimonlyWelcome.css">
</style>
<script>
  import SimonlyButton from '../simonly-button/SimonlyButton.vue';

  export default {
    name: 'simonly-welcome',
    ioc: ['simonlyStorage'],
    components: {
      SimonlyButton,
    },
    data() {
      return {
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
