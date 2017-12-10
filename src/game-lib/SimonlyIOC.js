import SimonlyHallOfFameQueries from '../components/simonly-hall-of-fame/SimonlyHallOfFame.queries';
import ioc from '../lib/ioc';
import SimonlyLocalUI from './SimonlyLocalUI';
import SimonlyGame from './SimonlyGame';
import vueIoc from '../lib/vue-ioc';
import SimonlyStorage from './SimonlyStorage';
import { db } from '../lib/db-firebase';
import SimonlyMultiplayerUI from './SimonlyMultiplayerUI';
import SimonlyRemoteUI from './SimonlyRemoteUI.spec';
import { SimonlyDynamicConfigOverwrite } from './SimonlyDynamicConfig';
import config from '../config';

const simonlyIOC = (Vue) => {
  const overwrittenConfig = SimonlyDynamicConfigOverwrite(window.location.href, config);
  ioc.set('config', overwrittenConfig);

  const simonlyLocalUI = new SimonlyLocalUI();
  const simonlyRemoteUI = new SimonlyRemoteUI();
  const simonlyMultiplayerUI = new SimonlyMultiplayerUI(db, simonlyLocalUI, simonlyRemoteUI);
  const simonlyStorage = new SimonlyStorage();
  const simonlyGame = new SimonlyGame(simonlyMultiplayerUI, overwrittenConfig.numKeys);
  const simonlyHallOfFameQueries = new SimonlyHallOfFameQueries(db, overwrittenConfig);

  ioc.set('simonlyLocalUI', simonlyLocalUI);
  ioc.set('simonlyGame', simonlyGame);
  ioc.set('simonlyStorage', simonlyStorage);
  ioc.set('queries', simonlyHallOfFameQueries);

  Vue.use(vueIoc);
};

export default simonlyIOC;
