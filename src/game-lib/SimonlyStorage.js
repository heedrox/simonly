/* eslint-disable class-methods-use-this */
export default class SimonlyStorage {

  set(key, value) {
    window.localStorage.setItem(key, value);
    return this.get(key);
  }

  get(key) {
    return Promise.resolve(window.localStorage.getItem(key));
  }

  clear() {
    window.localStorage.clear();
  }
}
