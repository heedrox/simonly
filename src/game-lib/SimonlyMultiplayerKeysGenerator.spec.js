import SimonlyMultiplayerKeysGenerator from './SimonlyMultiplayerKeysGenerator';
import dbMock from '../lib/dbMock';

describe('SimonlyMultiplayerKeysGenerator', () => {

  const SENT_KEYS_FROM_REMOTE = [1, 2, 3, 4, 5];
  const NUMBER_OF_KEYS_TO_ADD = 2;
  const CURRENT_KEYS = [1, 2, 3];

  it('should exist', () => {
    const generator = new SimonlyMultiplayerKeysGenerator(dbMock(), 10);

    expect(generator).to.be.defined;
  });

  describe('when i am master', () => {
    it('adds keys by me', (done) => {
      const simonlyMultiplayer = {
        isMaster: () => true,
      };
      const generator = new SimonlyMultiplayerKeysGenerator(dbMock(), 10, simonlyMultiplayer);

      generator.addKeys(CURRENT_KEYS, NUMBER_OF_KEYS_TO_ADD)
        .then((newKeys) => {
          expect(newKeys.length).to.equal(CURRENT_KEYS.length + NUMBER_OF_KEYS_TO_ADD);
          done();
        });
    });

    it('generates and maintains a local keys cache of LOCAL_KEYS_CACHE_LENGTH size more than current key', (done) => {
      const simonlyMultiplayer = {
        isMaster: () => true,
      };
      const generator = new SimonlyMultiplayerKeysGenerator(dbMock(), 10, simonlyMultiplayer);

      generator.addKeys(CURRENT_KEYS, NUMBER_OF_KEYS_TO_ADD)
        .then(() => {
          expect(generator.localKeysCache).to.be
            .length(SimonlyMultiplayerKeysGenerator.LOCAL_KEYS_CACHE_LENGTH + CURRENT_KEYS.length);
          done();
        });
    });
  });

  describe('when i am NOT master', () => {
    it('does not add keys when i am not master', (done) => {
      const simonlyMultiplayer = {
        isMaster: () => false,
      };
      const generator = new SimonlyMultiplayerKeysGenerator(dbMock(), 10, simonlyMultiplayer);
      generator.localKeysCache = [1, 2, 3, 6, 5, 4, 3, 2, 1];

      generator.addKeys([1, 2, 3], NUMBER_OF_KEYS_TO_ADD)
        .then((newKeys) => {
          expect(newKeys).to.eql([1, 2, 3, 6, 5]);
          done();
        });
    });

    it('does recover more keys when i am not master but there are not enough keys', (done) => {
      const simonlyMultiplayer = {
        isMaster: () => false,
      };
      const generator = new SimonlyMultiplayerKeysGenerator(dbMock(), 10, simonlyMultiplayer);
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
