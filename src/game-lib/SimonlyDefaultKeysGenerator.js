import repeat from '../lib/repeat';
import { randomNumber } from '../lib/numbers';

export default class SimonlyDefaultKeysGenerator {

  constructor(numKeys, simonlyMultiplayer) {
    this.numKeys = numKeys;
    this.simonlyMultiplayer = simonlyMultiplayer;
  }

  addKeys(keys, numNewKeys) {
    const newKeys = SimonlyDefaultKeysGenerator.addKeysFor(keys, numNewKeys, this.numKeys);
    return Promise.resolve(newKeys);
  }

  static addKeysFor(keys, numNewKeys, numDifferentKeys) {
    const newKeys = keys.slice();
    const pushRandomNumber = () => newKeys.push(randomNumber(1, numDifferentKeys));
    repeat(numNewKeys, pushRandomNumber);
    return newKeys;
  }
}
