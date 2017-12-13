/* eslint-disable no-unused-vars,class-methods-use-this */
export default class SimonlyMultiplayerUI {

  constructor(simonlyLocalUI, simonlyRemoteUI) {
    this.simonlyLocalUI = simonlyLocalUI;
    this.simonlyRemoteUI = simonlyRemoteUI;
  }

  showSequence(keys) {
    this.simonlyLocalUI.showSequence(keys);
    this.simonlyRemoteUI.showSequence(keys);
  }

  roundFailed(expectedKey, numTurn) {
    this.simonlyLocalUI.roundFailed(expectedKey, numTurn);
    this.simonlyRemoteUI.roundFailed(expectedKey, numTurn);
  }

  roundOk(nextTurn) {
    const promises = [
      this.simonlyLocalUI.roundOk(nextTurn),
      this.simonlyRemoteUI.roundOk(nextTurn),
    ];
    return Promise.all(promises);
  }

  updateScore(score) {
    this.simonlyLocalUI.updateScore(score);
    this.simonlyRemoteUI.updateScore(score);
  }
}
