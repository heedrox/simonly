<template>
  <div class="explain-simonly" >
    <p><router-link :to="{ path: '/explain'}" replace>Create your own simon!</router-link></p>
  </div>
</template>
<style scoped>
  .explain-simonly p {
    font-family: Verdana,serif;
    font-size: 4vh;
    position:absolute;
    bottom: 6vh;
    left: 2vw;
  }
</style>
