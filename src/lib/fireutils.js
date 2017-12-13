/* eslint-disable import/prefer-default-export */
const getArrayFromFireSnapshot = (snapshot) => {
  const result = [];
  snapshot.forEach(snap => result.push(snap.val()));
  return result;
};

export { getArrayFromFireSnapshot };
