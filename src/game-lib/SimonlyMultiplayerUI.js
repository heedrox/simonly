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

  roundFailed(expectedKey) {
    this.simonlyLocalUI.roundFailed(expectedKey);
    this.simonlyRemoteUI.roundFailed(expectedKey);
  }

  roundOk() {
    const promises = [
      this.simonlyLocalUI.roundOk(),
      this.simonlyRemoteUI.roundOk(),
    ];
    return Promise.all(promises);
  }

  updateScore(score) {
    this.simonlyLocalUI.updateScore(score);
    this.simonlyRemoteUI.updateScore(score);
  }
}
