<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<style>
  @font-face {
    font-family: GameFont;
    src: url(assets/comic.ttf);
    font-weight: bold;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  html {
    height: 100%;
    box-sizing: border-box;
    position: relative;
  }

  body {
    font-family: GameFont, serif;
    overflow: hidden;
    background: url(assets/background.jpg) center;
    background-size: cover;
    display: block;
    justify-content: center;
    margin: 0;
    padding: 0;
    height: 100%;
    min-height: 100%;
  }

  p {
    font-family: GameFont;
  }

  #app {
    font-family: GameFont, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
  }
</style>
<script>
  export default {
    mounted() {
      setTimeout(() => {

      }, 5000);
    },
  };
</script>
