import { sequenceArrayPromises } from '../lib/promises';
import timeoutUtil from '../lib/timeoutUtil';

const TIME_SECS_KEY_PRESSED = 600;

export default class SimonlyUI {

  constructor() {
    this.pressedKey = null;
    this.theRightKey = null;
    this.score = 0;
  }

  /* *** interface to be implemented by simonlyGamePresenter ***** */
  showSequence(keys) {
    this.theRightKey = null;
    const sequencePress = sequenceArrayPromises(this.showKey.bind(this));
    sequencePress(keys);
  }

  roundFailed(expectedKey) {
    this.roundKoAudio.volume = 1;
    this.roundKoAudio.play();
    this.theRightKey = expectedKey;
  }

  roundOk() {
    this.theRightKey = null;
    this.roundOkAudio.volume = 1;
    this.roundOkAudio.play();
    return timeoutUtil.syncTimeout(500);
  }

  updateScore(score) {
    this.score = score;
  }
  /* *** end interface ***** */

  showKey(pos) {
    this.pressedKey = pos;
    return timeoutUtil.syncTimeout(TIME_SECS_KEY_PRESSED)
      .then(() => { this.pressedKey = null; })
      .then(() => timeoutUtil.syncTimeout(100));
  }

  setOkAudio(okAudio) {
    this.roundOkAudio = okAudio;
  }

  setKoAudio(koAudio) {
    this.roundKoAudio = koAudio;
  }

}
