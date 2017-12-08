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

export { emptyRows, array0ToN };
