<template>
  <div class="explain-view">
    <h1>Simon.ly</h1>
    <h2>A totally customizable simon that you can play.</h2>
    <ul>
      <li>How to customize it: Create some images and sounds, and use <router-link :to="{ path: '/new'}" replace>the simon generator</router-link>.</li>
      <li>Start playing: A couple of examples:</li>
        <ul>
          <li>Basic style: <a href="https://simon.ly/" target="_blank">https://simon.ly/</a></li>
          <li>Chiquito style: <a href="https://bit.ly/simonlychiquito" target="_blank">https://bit.ly/simonlychiquito</a></li>
          <li>...</li>
          <li><router-link :to="{ path: '/new'}" replace>Do your own!</router-link></li>
        </ul>
    </ul>
    <p>Enjoy !</p>
    <h2>Why this?</h2>
    <p class="paragraph">I wanted to make for this Christmas a game in which my nephews and nieces where the main characters. I made it and packaged an app  into a APK and IPA so they can have it.
      I shared this to the world so others can do it if they want to. Find the repo in: <a href="https://github.com/jmarti-theinit/simonly" target="_blank">https://github.com/jmarti-theinit/simonly</a>.
    </p>
    <p class="paragraph">Don't have the skills to do it, but you would like to do something like this for a friend or your family?
      You may want to drop me a line at <a href="https://twitter.com/itortv" target="_blank">https://twitter.com/itortv</a></p>
    <p></p>
  </div>
</template>
<style scoped>
  .explain-view {
    padding: 4vh 3vw;
    text-align: left;
    overflow-y: scroll;
    height: 100vh;
  }
  h1 {
    margin: 0;
    padding: 0;
    font-family: GameFont;
    color: #f4dd06;
    text-shadow: 0.5vw 0.5vw #f5991b, 0.8vw 0.8vw #c82f27, 1vw 1vw #6c100f;

  }

  p, h2, li, div, a {
    font-family: Verdana,serif;
  }

  p.paragraph {
    margin-bottom: 2vh;
  }

</style>
