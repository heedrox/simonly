import config from '../../config';

export default class SimonlyHallOfFameQueries {
  constructor(db) {
    this.db = db;
  }

  top10() {
    return this.db.ref(`${config.nameOfFamily}/hall-of-fame`).orderByChild('scoreDesc').limitToFirst(7);
  }

// eslint-disable-next-line class-methods-use-this
  addTop10(hallRows, userName, score) {
    const newScore = hallRows.push();
    newScore.set({
      name: userName,
      score,
      scoreDesc: -score,
      date: new Date().toISOString(),
      datetime: new Date().getTime(),
    });
  }

}
