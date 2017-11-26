import timeout from '../lib/timeout';
import { sequenceArrayPromises } from '../lib/promises';
import repeat from '../lib/repeat';

const TIME_SECS_KEY_PRESSED = 1000;

export default class Game {

  constructor() {
    this.gameInfo = {
      pressed: null,
      numTurn: 1,
      numKeyInTurn: 1,
      score: 0,
      currentTurnKeys: [],
      userEnteredTurnKeys: [],
      failed: false,
    };
  }

  press(pos) {
    this.gameInfo.pressed = pos;
    return timeout(() => {
      this.gameInfo.pressed = null;
    }, TIME_SECS_KEY_PRESSED);
  }

  addTurnKeys() {
    const randomNumber = (min, max) => Math.floor((Math.random() * ((max + 1) - min)) + min);
    const pendingKeys = this.gameInfo.numTurn - this.gameInfo.currentTurnKeys.length;

    const pushRandomNumber = () => this.gameInfo.currentTurnKeys.push(randomNumber(1, 8));
    repeat(pendingKeys, pushRandomNumber);
  }

  userPressed(pressedKey) {
    const userEnteredNumKey = this.gameInfo.userEnteredTurnKeys.length;
    this.gameInfo.userEnteredTurnKeys.push(pressedKey);
    const expectedKey = this.gameInfo.currentTurnKeys[userEnteredNumKey];
    if (pressedKey === expectedKey) {
      this.gameInfo.score = this.gameInfo.score + 1;
      this.gameInfo.failed = false;
      this.checkNextTurn();
    } else {
      this.gameInfo.failed = true;
    }
  }

  checkNextTurn() {
    if (this.gameInfo.userEnteredTurnKeys.length === this.gameInfo.currentTurnKeys.length) {
      this.runTurn(this.gameInfo.numTurn + 1);
    }
  }

  runTurn(num) {
    this.gameInfo.numTurn = num;
    this.gameInfo.numKeyInTurn = 0;
    this.gameInfo.userEnteredTurnKeys = [];
    this.addTurnKeys();
    const sequencePress = sequenceArrayPromises(this.press.bind(this));
    sequencePress(this.gameInfo.currentTurnKeys);
  }

  start() {
    this.gameInfo.failed = false;
    this.gameInfo.score = 0;
    this.gameInfo.currentTurnKeys = [];
    this.runTurn(1);
  }

}
