/* eslint-disable no-console,class-methods-use-this */
export default class SimonlyRemoteUI {

  constructor(simonlyMultiplayer) {
    this.simonlyMultiplayer = simonlyMultiplayer;
  }

  showSequence(keys) {
    console.log('TODO remote.showSequence', keys);
  }

  roundFailed(expectedKey) {
    console.log('TODO remote.roundFailes', expectedKey);
  }

  roundOk() {
    console.log('TODO remote.roundOk');
  }

  updateScore(score) {
    this.simonlyMultiplayer.updateScore(score);
  }
}
