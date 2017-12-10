export default class SimonlyMultiplayerQueries {

  constructor(db, config) {
    this.db = db;
    this.config = config;
  }

  players() {
    return this.db.ref(`${this.config.nameOfFamily}/online-players`).orderByChild('scoreDesc');
  }

}
