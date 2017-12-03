import config from '../../config';

const SimonlyHallOfFameQueries = db => ({
  top10: () => db.ref(`${config.nameOfFamily}/hall-of-fame`).orderByChild('scoreDesc').limitToFirst(7),
});

// eslint-disable-next-line import/prefer-default-export
export { SimonlyHallOfFameQueries };
