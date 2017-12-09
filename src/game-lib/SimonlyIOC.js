import { db } from '../lib/db-firebase';
import SimonlyUI from './SimonlyUI';
import SimonlyGame from './SimonlyGame';
import vueIoc from '../lib/vue-ioc';
import SimonlyStorage from './SimonlyStorage';
import config from '../config';
import { SimonlyDynamicConfigOverwrite } from './SimonlyDynamicConfig';
import ioc from '../lib/ioc';
import SimonlyHallOfFameQueries from '../components/simonly-hall-of-fame/SimonlyHallOfFame.queries';

const simonlyIOC = (Vue) => {
  const overwrittenConfig = SimonlyDynamicConfigOverwrite(window.location.href, config);
  ioc.set('config', overwrittenConfig);

  const simonlyUI = new SimonlyUI();
  const simonlyGame = new SimonlyGame(simonlyUI, overwrittenConfig.numKeys);
  const simonlyStorage = new SimonlyStorage();
  const simonlyHallOfFameQueries = new SimonlyHallOfFameQueries(db, overwrittenConfig);

  ioc.set('simonlyUI', simonlyUI);
  ioc.set('simonlyGame', simonlyGame);
  ioc.set('simonlyStorage', simonlyStorage);
  ioc.set('queries', simonlyHallOfFameQueries);

  Vue.use(vueIoc);
};

export default simonlyIOC;
