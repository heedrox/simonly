import SimonlyDefaultKeysGenerator from './SimonlyDefaultKeysGenerator';

export default class SimonlyMultiplayerKeysGenerator {

  static LOCAL_KEYS_CACHE_LENGTH = 50;

  constructor(db, numKeys, simonlyMultiplayer) {
    this.db = db;
    this.numKeys = numKeys;
    this.simonlyMultiplayer = simonlyMultiplayer;
    this.localKeysCache = [];
  }

  addMoreKeys(keys) {
    this.localKeysCache = SimonlyDefaultKeysGenerator
      .addKeysFor(keys, SimonlyMultiplayerKeysGenerator.LOCAL_KEYS_CACHE_LENGTH, this.numKeys);
  }

  waitForMoreKeysAndAdd(numTotalKeys) {
    if (this.localKeysCache.length <= numTotalKeys) {
      return this.waitForMoreKeys()
        .then((newKeys) => { this.localKeysCache = newKeys; });
    }
    return Promise.resolve(this.localKeysCache);
  }

  addKeys(keys, numNewKeys) {
    if (this.simonlyMultiplayer.isMaster()) {
      this.addMoreKeys(keys);
      return Promise.resolve(this.localKeysCache.slice(0, keys.length + numNewKeys));
    }

    return this.waitForMoreKeysAndAdd(keys.length + numNewKeys)
      .then(() => this.localKeysCache.slice(0, keys.length + numNewKeys));
  }
}
