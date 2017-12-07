const container = { };

const ioc = {
  set: (name, object) => {
    container[name] = object;
  },
  get: name => container[name],
};

export default ioc;
