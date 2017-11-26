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
    color: #f5991b;
    text-shadow: 0.5vw 0.5vw #c82f27, 1vw 1vw #6c100f;
    font-weight:bold;
    font-size: 5vw;
    margin-top:2.3vw;
    margin-left:-0.5vw;
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
