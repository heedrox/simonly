const timeout = (func, time) => new Promise((resolve) => {
  setTimeout(() => {
    func();
    resolve();
  }, time);
});

const syncTimeout = msecs => timeout(() => {}, msecs);

const timeoutUtil = { timeout, syncTimeout };

export default timeoutUtil;

