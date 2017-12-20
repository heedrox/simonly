import SimonlyMultiplayerKeysGenerator from './SimonlyMultiplayerKeysGenerator';
import dbMock from '../lib/dbMock';

describe('SimonlyMultiplayerKeysGenerator', () => {
  const NUMBER_OF_KEYS_TO_ADD = 2;
  const CURRENT_KEYS = [1, 2, 3];
  let generator;

  beforeEach(() => {
    const simonlyMultiplayer = {
      isMaster: () => true,
    };
    generator = new SimonlyMultiplayerKeysGenerator(dbMock(), 'family', 10, simonlyMultiplayer);
  });

  it('should exist', () => {
    expect(generator).to.be.defined;
  });

  describe('when i am master', () => {
    it('adds keys by me', (done) => {
      generator.simonlyMultiplayer.isMaster = () => true;
      generator.addKeys(CURRENT_KEYS, NUMBER_OF_KEYS_TO_ADD)
        .then((newKeys) => {
          expect(newKeys.length).to.equal(CURRENT_KEYS.length + NUMBER_OF_KEYS_TO_ADD);
          done();
        });
    });

    it('generates and maintains a local keys cache of LOCAL_KEYS_CACHE_LENGTH size more than current key', (done) => {
      generator.simonlyMultiplayer.isMaster = () => true;
      generator.localKeysCache = [];

      generator.addKeys(CURRENT_KEYS, NUMBER_OF_KEYS_TO_ADD)
        .then(() => {
          expect(generator.localKeysCache).to.be
            .length(SimonlyMultiplayerKeysGenerator.LOCAL_KEYS_CACHE_LENGTH + CURRENT_KEYS.length);
          done();
        });
    });

    it('generate and maintains the same local keys cache from previous', (done) => {
      SimonlyMultiplayerKeysGenerator.LOCAL_KEYS_CACHE_LENGTH = 3;
      generator.simonlyMultiplayer.isMaster = () => true;
      generator.localKeysCache = [1, 2, 3, 4, 5, 6];
      generator.numKeys = 2; // hack to avoid generating in the test casually the same sequence

      generator.addKeys([1, 2, 3], 3)
        .then(() => {
          expect(generator.localKeysCache).to.eql([1, 2, 3, 4, 5, 6]);
          done();
        });
    });

    it('generates beyond local keys cache length always a number of that size of keys', (done) => {
      SimonlyMultiplayerKeysGenerator.LOCAL_KEYS_CACHE_LENGTH = 3;
      generator.simonlyMultiplayer.isMaster = () => true;
      generator.localKeysCache = [1, 2, 3];

      generator.addKeys([1, 2], 1)
        .then(() => {
          expect(generator.localKeysCache).to.be.length(5);
          done();
        });
    });

    it('removes local keys cache when starts a new game', (done) => {
      generator.simonlyMultiplayer.isMaster = () => true;
      generator.localKeysCache = [1, 2, 3];
      generator.numKeys = 2; // hack to make sure does not create a 3 casually

      generator.addKeys([], 1)
        .then(() => {
          expect(generator.localKeysCache.slice(0, 3)).not.to.eql([1, 2, 3]);
          done();
        });
    });
  });

  describe('when i am NOT master', () => {
    it('does not add keys when i am not master', (done) => {
      generator.simonlyMultiplayer.isMaster = () => false;
      generator.localKeysCache = [1, 2, 3, 6, 5, 4, 3, 2, 1];

      generator.addKeys([1, 2, 3], NUMBER_OF_KEYS_TO_ADD)
        .then((newKeys) => {
          expect(newKeys).to.eql([1, 2, 3, 6, 5]);
          done();
        });
    });

    it('does recover more keys when i am not master but there are not enough keys', (done) => {
      generator.simonlyMultiplayer.isMaster = () => false;
      generator.localKeysCache = [1, 2, 3, 6];
      generator.waitForMoreKeys = () => Promise.resolve([1, 2, 3, 6, 5, 4, 3, 2, 1]);

      generator.addKeys([1, 2, 3], NUMBER_OF_KEYS_TO_ADD)
        .then((newKeys) => {
          expect(newKeys).to.eql([1, 2, 3, 6, 5]);
          expect(generator.localKeysCache).to.eql([1, 2, 3, 6, 5, 4, 3, 2, 1]);
          done();
        });
    });
  });
});
