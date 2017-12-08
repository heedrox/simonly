import ioc from '../lib/ioc';
import SimonlyUI from './SimonlyUI';
import SimonlyGame from './SimonlyGame';
import vueIoc from '../lib/vue-ioc';
import SimonlyStorage from './SimonlyStorage';
import config from '../config';

const simonlyIOC = (Vue) => {
  const simonlyUI = new SimonlyUI();
  const simonlyGame = new SimonlyGame(simonlyUI, config.numKeys);
  const simonlyStorage = new SimonlyStorage();

  ioc.set('simonlyUI', simonlyUI);
  ioc.set('simonlyGame', simonlyGame);
  ioc.set('simonlyStorage', simonlyStorage);
  ioc.set('config', config);
  Vue.use(vueIoc);
};

export default simonlyIOC;
