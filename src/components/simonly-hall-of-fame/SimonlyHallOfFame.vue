<template>
  <div class="simonly-hall-of-fame">
    <table>
      <tr>
        <th colspan="4">Hall of fame</th>
      </tr>
      <tr v-for="(row,index) in hallRowsWithEmpty">
        <td width="5%" :class="{ left: true, winnerasterisk: index == 0 }">{{(index == 0)?'*':''}}</td>
        <td width="5%">{{index +  1}}</td>
        <td v-if="scorePosition !== index" width="55%">{{row.name ? row.name : '---'}}</td>
        <td v-if="scorePosition === index" width="55%">
          <form v-on:submit="saveName">
          <input placeholder="..." type="text" class="name" v-model="name" v-focus="focused" >
          <input type="submit" class="okimg" value=" ">
          </form>
        </td>
        <td width="30%" class="score" >{{ row.score ? row.score : '-' }}</td>
        <td width="5%" :class="{ right: true, winnerasterisk: index == 0 }">{{(index == 0)?'*':''}}</td>
      </tr>
    </table>
  </div>
</template>
<style scoped>

  table {
    margin:auto;
    width:60vw;
  }
  table th {
    color: #f4dd06;
    text-shadow: 0.5vw 0.5vw #f5991b, 0.8vw 0.8vw #c82f27, 1vw 1vw #6c100f;
    font-weight:bold;
    font-size: 8vh;
    letter-spacing: 0.8vw;
    padding-bottom:5vh;
  }

  table td {
    padding-top: 0;
    padding-right: 5vw;
    text-align: left;
    line-height:7vh;
    color: #c82f27;
    text-shadow: 0.2vw 0.2vw #6c100f;
    font-size: 4vh;
    letter-spacing: 0.5vw;
  }

  table td.score {
    text-align:right;
  }

  table tr:nth-child(2) td {
    color: #f5991b;
    font-weight:bold;
  }

  table td.winnerasterisk {
    font-size: 20vh;
    letter-spacing: 0;
    line-height: 3vh;
    margin: 0;
    padding: 0;
    max-height: 0;
    position: relative;
    top: 6vh;
  }

  table td.winnerasterisk.left {
    left: -5vw;
  }
  table td.winnerasterisk.right {
  }
  table tr:nth-child(2) {
    animation: bounce 6s infinite;
  }

  table td .name {
    text-transform: uppercase;
    background: transparent;
    color: #f5991b;
    padding: 1vw 0vw;
    font-size: 5vh;
    border:0px;
    width:20vw;
    display:inline;
  }

  table td input {
    display:inline;
  }

  table td form {
    white-space: nowrap;
  }
  table td input.okimg {
    width:5vh;
    height: 5vh;
    background: url(../../assets/ok.svg) center;
    background-size: cover;
    border: 0px;
    position:relative;
    display: inline;
  }
  @keyframes bounce {
    3% {
      transform: scale(1.2);
      opacity: 1;
    }
    7% {
      transform: scale(0.9);
      opacity: 1
    }
    10% {
      transform: scale(1.05)
    }
    13% {
      transform: scale(0.95)
    }
    17% {
      transform: scale(1);
    }
    42% {
      transform: scale(1);
    }
    45% {
      transform: scale(1.2)
    }
    48% {
      transform: scale(0.8);
    }
    52% {
      transform: scale(1);
    }
  }

</style>


<script>
  import { focus } from 'vue-focus';
  import { db } from '../../lib/db-firebase';
  import { SimonlyHallOfFameQueries } from './SimonlyHallOfFame.queries';

  export default {
    name: 'simonly-hall-of-fame',
    directives: {
      focus,
    },
    props: {
      score: 0,
    },
    data() {
      return {
        name: '',
        focused: false,
        editable: true,
      };
    },
    computed: {
      scorePosition() {
        if (this.score <= 0) return 99;
        if (!this.editable) return 99;
        const greaterThanScore = row => row.score > this.score;
        const rowsGreaterThanMe = this.hallRows.filter(greaterThanScore);
        const position = rowsGreaterThanMe.length < 7 ? rowsGreaterThanMe.length : null;
        this.checkFocus(position);
        return position;
      },
      hallRowsWithEmpty() {
        const emptyRows = (n) => {
          const result = [];
          Array.from(Array(n)).forEach(() => {
            result.push({});
          });
          return result;
        };

        return this.hallRows.concat(emptyRows(7 - this.hallRows.length));
      },
    },
    methods: {
      saveName() {
        const newScore = this.$firebaseRefs.hallRows.push();
        newScore.set({
          name: this.name,
          score: this.score,
          scoreDesc: -this.score,
        });
        this.editable = false;
      },
      checkFocus(position) {
        if (position < 7 && position !== null) {
          setTimeout(() => {
            this.editable = true;
            this.focused = true;
          }, 1000);
        }
      },
    },
    firebase: {
      hallRows: SimonlyHallOfFameQueries(db).top10(),
    },
    mounted() {
      this.editable = true;
    },
  };
</script>
