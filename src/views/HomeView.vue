<template>
  <div class="home-view">
    <simonly-board></simonly-board>
  </div>
</template>
<style>
  .home-view {
    width: 100%;
    height: 100%;
  }
</style>
<script>
  import SimonlyBoard from '../components/simonly-board/SimonlyBoard.vue';

  export default {
    components: {
      SimonlyBoard,
    },
  };
</script>
