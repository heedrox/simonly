const emptyRows = (n) => {
  const result = [];
  if (n > 0) {
    Array.from(Array(n)).forEach(() => {
      result.push({});
    });
  }
  return result;
};

// eslint-disable-next-line import/prefer-default-export
export { emptyRows };
