const emptyRows = (n) => {
  const result = [];
  if (n > 0) {
    Array.from(Array(n)).forEach(() => {
      result.push({});
    });
  }
  return result;
};

const array0ToN = (n) => {
  if (typeof n === 'undefined') return [];
  if (n <= 0) return [0];
  if (n === 1) return [0, 1];
  return Array(...{ length: (n + 1) }).map(Number.call, Number);
};

const byAsc = property => (a, b) => a[property] - b[property];
const byDesc = property => (a, b) => b[property] - a[property];

const byNot = (property, value) => obj => obj[property] !== value;
const byEqual = (property, value) => obj => obj[property] === value;

const extractProperty = property => obj => obj[property];

export { emptyRows, array0ToN, byAsc, byDesc, byNot, byEqual, extractProperty };
