<template>
  <div class="simonly-score">
    <p>{{ score }}</p>

  </div>
</template>
<style scoped>
  .simonly-score p {
    display:block;
    color: #fff;
    font-weight:bold;
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
