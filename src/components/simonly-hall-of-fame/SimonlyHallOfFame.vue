<template>
  <div class="simonly-hall-of-fame">
    <table>
      <tr>
        <th colspan="4">Hall of fame</th>
      </tr>
      <tr :class="{ winnerrow: isRowCurrentGame(row) }" v-for="(row, index) in hallRowsWithEmpty">
        <td width="5%" :class="{ left: true, winnerasterisk: isRowCurrentGame(row) }">{{(isRowCurrentGame(row)) ? '*' : ''}}</td>
        <td width="5%">{{index + 1}}</td>
        <td width="55%">
          {{row.name ? row.name : '---'}}
        </td>
        <td width="30%" class="score">{{ row.score ? row.score : '-' }}</td>
        <td width="5%" :class="{ right: true, winnerasterisk: isRowCurrentGame(row) }">{{(isRowCurrentGame(row)) ? '*' : ''}}</td>
      </tr>
    </table>
  </div>
</template>
<style scoped>

  table {
    margin: auto;
    width: 60vw;
  }

  table th {
    color: #f4dd06;
    text-shadow: 0.5vw 0.5vw #f5991b, 0.8vw 0.8vw #c82f27, 1vw 1vw #6c100f;
    font-weight: bold;
    font-size: 8vh;
    letter-spacing: 0.8vw;
    padding-bottom: 5vh;
  }

  table td {
    padding-top: 0;
    padding-right: 5vw;
    text-align: left;
    line-height: 7vh;
    color: #c82f27;
    text-shadow: 0.2vw 0.2vw #6c100f;
    font-size: 4vh;
    letter-spacing: 0.5vw;
  }

  table td.score {
    text-align: right;
  }

  table tr.winnerrow td {
    color: #f5991b;
    font-weight: bold;
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

  table tr.winnerrow {
    animation: bounce 6s infinite;
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
  import { db } from '../../lib/db-firebase';
  import SimonlyHallOfFameQueries from './SimonlyHallOfFame.queries';
  import { emptyRows } from '../../lib/arrays';

  export default {
    name: 'simonly-hall-of-fame',
    ioc: ['simonlyStorage'],
    props: {
      score: 0,
    },
    data() {
      return {
        name: '',
        queries: new SimonlyHallOfFameQueries(db),
        username: '',
      };
    },
    computed: {
      hallRowsWithEmpty() {
        const numEmptyRowsToAdd = 7 - (this.hallRows ? this.hallRows.length : 0);
        return this.hallRows.concat(emptyRows(numEmptyRowsToAdd));
      },
    },
    methods: {
      saveName() {
        this.simonlyStorage.get('name')
          .then((userName) => {
            if (userName) {
              this.queries.addTop10(this.$firebaseRefs.hallRows, userName, this.score);
            }
          });
      },
      isRowCurrentGame(row) {
        return ((this.score === row.score) && (this.username === row.name));
      },
      checkToSave() {
        if (this.score > 0) {
          this.saveName();
        }
      },
    },
    firebase() {
      return {
        hallRows: this.queries.top10(),
      };
    },
    mounted() {
      this.checkToSave();
      this.simonlyStorage.get('name')
        .then((name) => {
          this.username = name;
        });
    },
  };
</script>
