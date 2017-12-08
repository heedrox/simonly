<template>
  <div class="simonly-hall-of-fame">
    <table>
      <tr>
        <th colspan="4">Hall of fame</th>
      </tr>
      <tr :class="{ winnerrow: isRowCurrentGame(row) }" v-for="(row, index) in hallRowsWithEmpty">
        <td width="5%" :class="{ left: true, winnerasterisk: isRowCurrentGame(row) }">{{(isRowCurrentGame(row)) ? '*' : ''}}</td>
        <td width="5%">{{index + 1}}</td>
        <td width="55%" class="namecell">
          {{row.name ? row.name : '---'}}
        </td>
        <td width="30%" class="score">{{ row.score ? row.score : '-' }}</td>
        <td width="5%" :class="{ right: true, winnerasterisk: isRowCurrentGame(row) }">{{(isRowCurrentGame(row)) ? '*' : ''}}</td>
      </tr>
    </table>
  </div>
</template>
<style scoped src="./SimonlyHallOfFame.css"></style>

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
