export const sequenceTwoPromises = func => (previous, current) =>
  previous.then(() => func(current));
export const sequenceArrayPromises = func => turns =>
  turns.reduce(sequenceTwoPromises(func), Promise.resolve());

