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
html {
  height: 100%;
}

body {
  background: #000;
  display: flex;
  justify-content: center;
  margin: 0;
  height: 100%;
  font-family: GameFont;
}

p { font-family: GameFont; }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

a {
  color: #42b983;
  text-decoration: none;
}
</style>
