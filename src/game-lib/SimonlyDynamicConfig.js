const getCode = (url) => {
  if (url.indexOf('/_/') < 0) return false;
  return url
    .replace('https://simon.ly/#/_/', '')
    .replace('http://localhost:8080/#/_/', '');
};

const decode = code => JSON.parse(window.atob(decodeURIComponent(code)));

const SimonlyDynamicConfigEncode = json => encodeURIComponent(window.btoa(JSON.stringify(json)));

const SimonlyDynamicConfigOverwrite = (url, config) => {
  const newConfig = Object.assign({}, config);
  const code = getCode(url);
  if (code) {
    const decodedCode = decode(code);
    if (decodedCode.d) {
      newConfig.numKeys = decodedCode.d.length;
      newConfig.dataKeys = decodedCode.d;
    }
    if (decodedCode.id) {
      newConfig.nameOfFamily = decodedCode.id;
    }
  }
  return newConfig;
};

export { SimonlyDynamicConfigOverwrite, SimonlyDynamicConfigEncode };
