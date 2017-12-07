/* eslint-disable no-underscore-dangle,import/no-mutable-exports */
import ioc from './ioc';

export let _Vue = null;

const install = (Vue) => {
  if (install.installed && _Vue === Vue) return;
  install.installed = true;

  _Vue = Vue;

  Vue.mixin({
    data() {
      const resData = {};
      if (this.$options.ioc) {
        this.$options.ioc.forEach((dependency) => {
          resData[dependency] = ioc.get(dependency);
        });
      }
      return resData;
    },
  });
};

const vueIoc = {
  install,
};

export default vueIoc;
