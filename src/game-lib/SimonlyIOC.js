import ioc from '../lib/ioc';
import SimonlyUI from './SimonlyUI';
import SimonlyGame from './SimonlyGame';
import vueIoc from '../lib/vue-ioc';

const simonlyIOC = (Vue) => {
  const simonlyUI = new SimonlyUI();
  const simonlyGame = new SimonlyGame(simonlyUI);
  ioc.set('simonlyUI', simonlyUI);
  ioc.set('simonlyGame', simonlyGame);
  Vue.use(vueIoc);
};

export default simonlyIOC;
