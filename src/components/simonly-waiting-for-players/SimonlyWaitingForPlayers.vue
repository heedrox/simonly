<template>
  <div>
    <h1>Waiting others...</h1>
    <ul>
      <li v-for="(row, index) in players" :key="index" :class="{ ready: row.state === 'waiting-for-players', notReady: row.state !== 'waiting-for-players' }">
        <span class="spinner"></span> {{row.name}}
      </li>
    </ul>
  </div>
</template>
<style scoped>
  h1 {
    margin-top: 20vh;
    color: #f4dd06;
    text-shadow: 0.5vw 0.5vw #f5991b, 0.8vw 0.8vw #c82f27, 1vw 1vw #6c100f;
    font-weight:bold;
    font-size: 10vh;
    letter-spacing: 0.8vw;
    animation: bounce 6s infinite;
  }

  ul {
    width: 100vw;
    display: table;
    margin: 0 auto auto 0;
  }

  li  {
    display: table-row;
    font-family: Atarian, serif;
    font-weight: bold;
    width:42vw;
    float:left;
    margin-top: 1vh;
    margin-bottom: 1vh;
    text-align: center;
    letter-spacing: 0.3vw;
    font-size: 8vh;
    overflow: hidden;
    white-space: nowrap;
    color: #f5991b;
    text-shadow: 0.15vw 0.15vw 0 #6c100f;
    border-radius: 10px;
    background-color: #fff;
    height: 10vh;
    margin-right: 3vw;
    border: solid 0.3vh #6c100f;
    animation: slideInUp 1s;
  }

  li.ready {
    background-color: #cfffcf;
  }
  li.notReady {

  }

  li.ready span.spinner {

  }

  li {
    position: relative; /* necessary for positioning the :after */
  }

  li.ready {
    list-style: none; /* remove normal bullet for done items */
  }

  li.ready:after {
    content: " ";
    background-color: transparent;

    /* position the checkbox */
    position: absolute;
    left: 2vw;
    top: 1vh;

    /* setting the checkbox */
    /* short arm */
    width: 4vh;
    border-bottom: 1vw solid #4D7C2A;
    /* long arm */
    height: 6vh;
    border-right: 1vw solid #4D7C2A;

    /* rotate the mirrored L to make it a checkbox */
    transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  li.notReady span.spinner {
    width: 6vh;
    height: 6vh;
    float: left;
    margin-left: 3vh;
    margin-top: 1.5vh;
    margin-right: -6vh;
    border-radius: 100%;
    background-color: #6c100f;
    -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
    animation: sk-scaleout 1.0s infinite ease-in-out;
  }

  @-webkit-keyframes sk-scaleout {
    0% { -webkit-transform: scale(0) }
    100% {
      -webkit-transform: scale(1.0);
      opacity: 0;
    }
  }

  @keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 100% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
        opacity: 0;
      }
  }
</style>
<script>
  export default {
    name: 'simonly-waiting-for-players',
    ioc: ['simonlyMultiplayer'],
    firebase() {
      return {
        players: this.simonlyMultiplayer.getPlayers(),
      };
    },
  };
</script>
