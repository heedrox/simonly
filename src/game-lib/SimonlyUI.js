import { sequenceArrayPromises } from '../lib/promises';
import timeout from '../lib/timeout';
import syncTimeout from '../lib/synctimeout';

const TIME_SECS_KEY_PRESSED = 600;

export default class SimonlyUI {

  constructor() {
    this.pressedKey = null;
  }

  /* *** interface to be implemented by simonlyGamePresenter ***** */
  press(pos) {
    this.pressedKey = pos;
    return syncTimeout(TIME_SECS_KEY_PRESSED)
      .then(() => { this.pressedKey = null; })
      .then(() => syncTimeout(100));
  }

  showSequence(keys) {
    const sequencePress = sequenceArrayPromises(this.press.bind(this));
    sequencePress(keys);
  }

  roundFailed() {
    this.roundKoAudio.play();
  }

  roundOk() {
    this.roundOkAudio.play();
    return timeout(() => {
    }, 500);
  }
  /* *** end interface ***** */

  setOkAudio(okAudio) {
    this.roundOkAudio = okAudio;
  }

  setKoAudio(koAudio) {
    this.roundKoAudio = koAudio;
  }

}
