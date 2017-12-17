/* eslint-disable class-methods-use-this */
import SimonlyDefaultKeysGenerator from './SimonlyDefaultKeysGenerator';

export default class SimonlyMultiplayerKeysGenerator {

  constructor(numKeys, simonlyMultiplayer) {
    this.numKeys = numKeys;
    this.simonlyMultiplayer = simonlyMultiplayer;
  }

  addKeysAsMaster(keys, numNewKeys) {
    return SimonlyDefaultKeysGenerator.addKeysFor(keys, numNewKeys, this.numKeys);
  }

  addKeys(keys, numNewKeys) {
    if (this.simonlyMultiplayer.isMaster()) {
      return this.addKeysAsMaster(keys, numNewKeys);
    }
    return [1, 2, 3, 4, 5];
    // return this.simonlyMultiplayer.getKeysFromRemote();
  }
}
