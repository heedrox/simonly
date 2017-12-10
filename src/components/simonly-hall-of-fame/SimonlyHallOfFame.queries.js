export default class SimonlyHallOfFameQueries {
  constructor(db, config) {
    this.db = db;
    this.config = config;
  }

  top10() {
    return this.db.ref(`${this.config.nameOfFamily}/hall-of-fame`).orderByChild('scoreDesc').limitToFirst(7);
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
