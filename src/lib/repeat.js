export default (n, func) => Array.from(
  { length: n },
  () => func(),
);
