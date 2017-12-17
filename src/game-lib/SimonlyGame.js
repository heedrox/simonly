import SimonlyDefaultKeysGenerator from './SimonlyDefaultKeysGenerator';

export default class SimonlyGame {

  constructor(simonlyUI, numKeys, simonlyKeysGenerator) {
    this.gameInfo = {
      numTurn: 0,
      numKeyInTurn: 1,
      score: 0,
      currentTurnKeys: [],
      userEnteredTurnKeys: [],
      failed: false,
    };
    this.simonlyUI = simonlyUI;
    this.numKeys = numKeys;
    this.simonlyKeysGenerator =
      simonlyKeysGenerator || new SimonlyDefaultKeysGenerator(this.numKeys);
  }

  addTurnKeys() {
    const numOfNewKeys = this.gameInfo.numTurn - this.gameInfo.currentTurnKeys.length;
    this.gameInfo.currentTurnKeys =
      this.simonlyKeysGenerator.addKeys(this.gameInfo.currentTurnKeys, numOfNewKeys);
  }

  userPressed(pressedKey) {
    const userEnteredNumKey = this.gameInfo.userEnteredTurnKeys.length;
    const expectedKey = this.gameInfo.currentTurnKeys[userEnteredNumKey];
    if (pressedKey === expectedKey) {
      this.gameInfo.userEnteredTurnKeys.push(pressedKey);
      this.setScore(this.gameInfo.score + 1);
      this.gameInfo.failed = false;
      this.checkNextTurn();
    } else {
      this.gameInfo.failed = true;
      this.simonlyUI.roundFailed(expectedKey, this.gameInfo.numTurn);
    }
  }

  checkNextTurn() {
    const userKeys = this.gameInfo.userEnteredTurnKeys;
    const turnKeys = this.gameInfo.currentTurnKeys;
    const endOfRound = (userKeys.length === turnKeys.length);
    if (endOfRound) {
      this.simonlyUI.roundOk(this.gameInfo.numTurn)
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
    this.setScore(0);
    this.gameInfo.currentTurnKeys = [];
    this.runTurn(1);
  }

  setScore(score) {
    this.gameInfo.score = score;
    this.simonlyUI.updateScore(score);
  }
}
