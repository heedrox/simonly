import repeat from '../lib/repeat';

export default class SimonlyGame {

  constructor(simonlyUI) {
    this.gameInfo = {
      numTurn: 1,
      numKeyInTurn: 1,
      score: 0,
      currentTurnKeys: [],
      userEnteredTurnKeys: [],
      failed: false,
    };
    this.simonlyUI = simonlyUI;
  }

  addTurnKeys() {
    const randomNumber = (min, max) => Math.floor((Math.random() * ((max + 1) - min)) + min);
    const pendingKeys = this.gameInfo.numTurn - this.gameInfo.currentTurnKeys.length;

    const pushRandomNumber = () => this.gameInfo.currentTurnKeys.push(randomNumber(1, 8));
    repeat(pendingKeys, pushRandomNumber);
  }

  userPressed(pressedKey) {
    const userEnteredNumKey = this.gameInfo.userEnteredTurnKeys.length;
    const expectedKey = this.gameInfo.currentTurnKeys[userEnteredNumKey];
    if (pressedKey === expectedKey) {
      this.gameInfo.userEnteredTurnKeys.push(pressedKey);
      this.gameInfo.score = this.gameInfo.score + 1;
      this.gameInfo.failed = false;
      this.checkNextTurn();
    } else {
      this.gameInfo.failed = true;
      this.simonlyUI.roundFailed(expectedKey);
    }
  }

  checkNextTurn() {
    const userKeys = this.gameInfo.userEnteredTurnKeys;
    const turnKeys = this.gameInfo.currentTurnKeys;
    const endOfRound = (userKeys.length === turnKeys.length);
    if (endOfRound) {
      this.simonlyUI.roundOk(this.gameInfo.numTurn + 1)
        .then(() => {
          this.runTurn(this.gameInfo.numTurn + 1);
        });
    }
  }

  runTurn(num) {
    this.gameInfo.numTurn = num;
    this.gameInfo.numKeyInTurn = 0;
    this.gameInfo.userEnteredTurnKeys = [];
    this.addTurnKeys();
    this.simonlyUI.showSequence(this.gameInfo.currentTurnKeys);
  }

  start() {
    this.gameInfo.failed = false;
    this.gameInfo.score = 0;
    this.gameInfo.currentTurnKeys = [];
    this.runTurn(1);
  }

}
