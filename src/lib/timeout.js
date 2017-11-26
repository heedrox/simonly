export default (func, time) => new Promise((resolve) => {
  setTimeout(() => {
    func();
    resolve();
  }, time);
});
