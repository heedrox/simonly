import SimonlyDefaultKeysGenerator from './SimonlyDefaultKeysGenerator';

describe('SimonlyDefaultKeysGenerator', () => {
  it('should exist', () => {
    const generator = new SimonlyDefaultKeysGenerator(10);

    expect(generator).to.be.defined;
  });

  it('adds keys', (done) => {
    const generator = new SimonlyDefaultKeysGenerator(10);
    const NUMBER_OF_KEYS_TO_ADD = 2;
    const CURRENT_KEYS = [1, 2, 3];

    generator.addKeys(CURRENT_KEYS, NUMBER_OF_KEYS_TO_ADD)
      .then((newKeys) => {
        expect(newKeys.length).to.equal(CURRENT_KEYS.length + NUMBER_OF_KEYS_TO_ADD);
        done();
      });
  });
});
