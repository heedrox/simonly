import SimonlyDefaultKeysGenerator from './SimonlyDefaultKeysGenerator';

export default class SimonlyMultiplayerKeysGenerator {

  static LOCAL_KEYS_CACHE_LENGTH = 50;

  constructor(db, nameOfFamily, numKeys, simonlyMultiplayer) {
    this.db = db;
    this.numKeys = numKeys;
    this.nameOfFamily = nameOfFamily;
    this.simonlyMultiplayer = simonlyMultiplayer;
    this.localKeysCache = [];
    this.promisePendingResolve = null;
    this.sequenceRef = this.db.ref(`${this.nameOfFamily}/sequence`);
    this.sequenceRef.on('value', (snap) => { this.onSequenceChanged(snap.val()); });
  }

  cleanSequence() {
    if (this.sequenceRef) {
      this.sequenceRef.set([]);
      this.localKeysCache = [];
    }
  }

  addMoreKeys(keys) {
    const numKeysToAdd =
      (SimonlyMultiplayerKeysGenerator.LOCAL_KEYS_CACHE_LENGTH + keys.length) -
      this.localKeysCache.length;
    this.localKeysCache = SimonlyDefaultKeysGenerator.addKeysFor(this.localKeysCache,
      numKeysToAdd, this.numKeys);
    this.sequenceRef.set(this.localKeysCache);
  }

  onSequenceChanged(newKeys) {
    const safeNewKeys = !newKeys ? [] : newKeys;
    this.localKeysCache = safeNewKeys;
    if (this.promisePendingResolve) {
      const isSequenceEnough = this.checkPendingAndResolve(safeNewKeys);
      if (isSequenceEnough) {
        this.promisePendingResolve(safeNewKeys);
        this.checkPendingAndResolve = null;
        this.promisePendingResolve = null;
      }
    }
  }

  waitForMoreKeys(numTotalKeys) {
    return new Promise((resolve) => {
      this.promisePendingResolve = resolve;
      this.checkPendingAndResolve = newKeys => newKeys.length >= numTotalKeys;
      this.sequenceRef.once('value', snap => this.onSequenceChanged(snap.val()));
    });
  }

  waitForMoreKeysAndAdd(numTotalKeys) {
    if (this.localKeysCache.length <= numTotalKeys) {
      return this.waitForMoreKeys(numTotalKeys)
        .then((newKeys) => { this.localKeysCache = newKeys; });
    }
    return Promise.resolve(this.localKeysCache);
  }

  addKeys(keys, numNewKeys) {
    if (keys.length === 0) {
      this.localKeysCache = [];
    }

    if (this.simonlyMultiplayer.isMaster()) {
      this.addMoreKeys(keys);
      return Promise.resolve(this.localKeysCache.slice(0, keys.length + numNewKeys));
    }

    return this.waitForMoreKeysAndAdd(keys.length + numNewKeys)
      .then(() => this.localKeysCache.slice(0, keys.length + numNewKeys));
  }
}
