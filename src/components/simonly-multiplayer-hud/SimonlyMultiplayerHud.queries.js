export default class SimonlyMultiplayerHudQueries {

  constructor(db, config) {
    this.db = db;
    this.config = config;
  }

  players() {
    return this.db.ref(`${this.config.nameOfFamily}/players`).orderByChild('scoreDesc');
  }

}
