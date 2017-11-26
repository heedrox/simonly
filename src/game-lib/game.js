import timeout from '../lib/timeout';
import { sequenceArrayPromises } from '../lib/promises';

const TIME_SECS_KEY_PRESSED = 1000;

export default class Game {

  constructor() {
    this.gameInfo = {
      pressed: null,
      numTurn: 1,
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

  createTurnKeys() {
    const randomNumber = (min, max) => Math.floor((Math.random() * ((max + 1) - min)) + min);
    this.gameInfo.currentTurnKeys = Array.from(
      { length: this.gameInfo.numTurn },
      () => randomNumber(1, 8));
  }

  userPressed(pressedKey) {
    const userEnteredNumTurn = this.gameInfo.userEnteredTurnKeys.length;
    this.gameInfo.userEnteredTurnKeys.push(pressedKey);
    const expectedKey = this.gameInfo.currentTurnKeys[userEnteredNumTurn];
    if (pressedKey === expectedKey) {
      this.gameInfo.score = this.gameInfo.score + 1;
      this.gameInfo.failed = false;
    } else {
      this.gameInfo.failed = true;
    }
  }

  start() {
    this.gameInfo.numTurn = 1;
    this.gameInfo.failed = false;
    this.createTurnKeys();
    this.gameInfo.userEnteredTurnKeys = [];
    const sequencePress = sequenceArrayPromises(this.press.bind(this));
    sequencePress(this.gameInfo.currentTurnKeys);
  }

}
