import SimonlyMultiplayerKeysGenerator from './SimonlyMultiplayerKeysGenerator';

describe('SimonlyMultiplayerKeysGenerator', () => {

  const SENT_KEYS_FROM_REMOTE = [1, 2, 3, 4, 5];
  const NUMBER_OF_KEYS_TO_ADD = 2;
  const CURRENT_KEYS = [1, 2, 3];

  it('should exist', () => {
    const generator = new SimonlyMultiplayerKeysGenerator(10);

    expect(generator).to.be.defined;
  });

  it('adds keys when i am master', () => {
    const simonlyMultiplayer = {
      isMaster: () => true,
    };
    const generator = new SimonlyMultiplayerKeysGenerator(10, simonlyMultiplayer);

    const newKeys = generator.addKeys(CURRENT_KEYS, NUMBER_OF_KEYS_TO_ADD);

    expect(newKeys.length).to.equal(CURRENT_KEYS.length + NUMBER_OF_KEYS_TO_ADD);
  });

  it('does not add keys when i am not master', () => {
    const simonlyMultiplayer = {
      isMaster: () => false,
      getKeysFromRemote: () => Promise.resolve(SENT_KEYS_FROM_REMOTE),
    };
    const generator = new SimonlyMultiplayerKeysGenerator(10, simonlyMultiplayer);

    const newKeys = generator.addKeys(CURRENT_KEYS, NUMBER_OF_KEYS_TO_ADD);

    expect(newKeys).to.eql(SENT_KEYS_FROM_REMOTE);
  });
});
