/* eslint-disable class-methods-use-this */
import repeat from '../lib/repeat';
import { randomNumber } from '../lib/numbers';

export default class SimonlyDefaultKeysGenerator {

  constructor(numKeys) {
    this.numKeys = numKeys;
  }

  addKeys(keys, numNewKeys) {
    const newKeys = keys.slice();
    const pushRandomNumber = () => newKeys.push(randomNumber(1, this.numKeys));
    repeat(numNewKeys, pushRandomNumber);
    return newKeys;
  }
}
