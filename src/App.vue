<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<style>
  @font-face {
    font-family: GameFont;
    src: url(./assets/comic.ttf);
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
    background-color: #27DFEF;
    display: block;
    justify-content: center;
    margin: 0;
    padding: 0;
    height: 100%;
    min-height: 100%;
  }

  p, input {
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


  @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin { 100% { transform:rotate(360deg); } }

  body:before {
    content:"";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:url(./assets/background.jpg)  no-repeat center center fixed;
    background-size:200%;
    -webkit-animation:backanimation 60s linear infinite;
    -moz-animation:backanimation 60s linear infinite;
    animation:backanimation 60s linear infinite;
    z-index: -1;
  }

  @keyframes backanimation {
    0% { transform: scale(1.1) rotate(00deg); }
    10% { transform: scale(1.2) rotate(10deg); }
    20% { transform: scale(1.3) rotate(-10deg); }
    30% { transform: scale(1.4) rotate(10deg); }
    40% { transform: scale(1.4) rotate(-10deg); }
    50% { transform: scale(1.5) rotate(10deg); }
    60% { transform: scale(1.5) rotate(-10deg); }
    90% { transform: scale(1)  rotate(0deg); }
  }
</style>
