const SimonlyHallOfFameQueries = db => ({
  top10: () => db.ref('marticarrera8/hall-of-fame').orderByChild('scoreDesc').limitToFirst(7),
});

// eslint-disable-next-line import/prefer-default-export
export { SimonlyHallOfFameQueries };
