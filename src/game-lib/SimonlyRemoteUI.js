/* eslint-disable no-console,class-methods-use-this */
export default class SimonlyRemoteUI {

  constructor(simonlyMultiplayer) {
    this.simonlyMultiplayer = simonlyMultiplayer;
  }

  showSequence(keys) {
    console.log('TODO remote.showSequence', keys);
  }

  roundFailed(expectedKey, numTurn) {
    return this.simonlyMultiplayer.updateLastFinishedTurn(numTurn, false)
      .then(() => this.simonlyMultiplayer.waitForUsersFinishRound(numTurn));
  }

  roundOk(numTurn) {
    return this.simonlyMultiplayer.updateLastFinishedTurn(numTurn, true)
      .then(() => this.simonlyMultiplayer.waitForUsersFinishRound(numTurn));
  }

  updateScore(score) {
    this.simonlyMultiplayer.updateScore(score);
  }
}
