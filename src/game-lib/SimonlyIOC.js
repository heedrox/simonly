import ioc from '../lib/ioc';
import SimonlyUI from './SimonlyUI';
import SimonlyGame from './SimonlyGame';
import vueIoc from '../lib/vue-ioc';
import SimonlyStorage from './SimonlyStorage';

const simonlyIOC = (Vue) => {
  const simonlyUI = new SimonlyUI();
  const simonlyGame = new SimonlyGame(simonlyUI);
  const simonlyStorage = new SimonlyStorage();
  ioc.set('simonlyUI', simonlyUI);
  ioc.set('simonlyGame', simonlyGame);
  ioc.set('simonlyStorage', simonlyStorage);
  Vue.use(vueIoc);
};

export default simonlyIOC;
