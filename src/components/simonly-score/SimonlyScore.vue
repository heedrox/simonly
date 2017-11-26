<template>
  <div class="simonly-score">
    <p>{{ score }}</p>

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
    color: #999900;
    font-weight:bold;
    font-size: 5vw;
    margin-top:2.5vw;
  }
</style>


<script>
  export default {
    name: 'simonly-score',
    components: {
    },
    data() {
      return {

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
  };
</script>
