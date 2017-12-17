/* eslint-disable import/prefer-default-export */
const getArrayFromFireSnapshot = (snapshot) => {
  const result = [];

  snapshot.forEach((childSnapshot) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    result.push(item);
  });

  return result;
};

export { getArrayFromFireSnapshot };
