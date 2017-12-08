/* eslint-disable no-unused-vars,class-methods-use-this */
export default class SimonlyMultiplayerUI {

  constructor(db, simonlyLocalUI) {
    this.db = db;
    this.simonlyLocalUI = simonlyLocalUI;
  }

  showSequence(keys) {
    this.simonlyLocalUI.showSequence(keys);
  }

  roundFailed(expectedKey) {
    this.simonlyLocalUI.roundFailed(expectedKey);
  }

  roundOk() {
    return this.simonlyLocalUI.roundOk();
  }

  updateScore(score) {
    this.simonlyLocalUI.updateScore(score);
  }
}
