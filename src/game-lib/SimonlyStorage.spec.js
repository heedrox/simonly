import SimonlyStorage from './SimonlyStorage';

describe('SimonlyStorage', () => {
  it('sets item, while gets back the data', (done) => {
    const storage = new SimonlyStorage();
    storage.set('key', 'value')
      .then((value) => {
        expect(value).to.be.equal('value');
        done();
      });
  });

  it('gets value', (done) => {
    const storage = new SimonlyStorage();
    storage.set('key2', 'value2')
      .then(() => storage.get('key2'))
      .then((value) => {
        expect(value).to.be.equal('value2');
        done();
      });
  });

  it('clears', (done) => {
    const storage = new SimonlyStorage();
    storage.set('key3', 'value3');

    storage.clear();

    storage.get('key3')
      .then((value) => {
        expect(value).to.be.null;
        done();
      });
  });
});
