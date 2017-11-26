export default class FakePromise {
  constructor(data, error) {
    this.data = data;
    this.error = error;
  }

  then(onFullfilled, onRejected) {
    try {
      const data = onFullfilled.call(onFullfilled, this.data);
      return data instanceof FakePromise ? data : new FakePromise(data, null);
    } catch (e) {
      onRejected.call(onRejected, e);
      return new FakePromise(null, e);
    }
  }

  catch() {
    return this.data;
  }

  get() {
    return this.data;
  }
}

FakePromise.resolved = function (data) {
  return new FakePromise(data, null);
};

FakePromise.rejected = function (e) {
  return new FakePromise(null, e);
};
