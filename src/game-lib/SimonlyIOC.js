import SimonlyHallOfFameQueries from '../components/simonly-hall-of-fame/SimonlyHallOfFame.queries';
import ioc from '../lib/ioc';
import SimonlyLocalUI from './SimonlyLocalUI';
import SimonlyGame from './SimonlyGame';
import vueIoc from '../lib/vue-ioc';
import SimonlyStorage from './SimonlyStorage';
import { db } from '../lib/db-firebase';
import SimonlyMultiplayerUI from './SimonlyMultiplayerUI';
import SimonlyRemoteUI from './SimonlyRemoteUI';
import { SimonlyDynamicConfigOverwrite } from './SimonlyDynamicConfig';
import config from '../config';
import SimonlyMultiplayerHudQueries from '../components/simonly-multiplayer-hud/SimonlyMultiplayerHud.queries';
import SimonlyMultiplayer from './SimonlyMultiplayer';


const simonlyIOC = (Vue) => {
  const overwrittenConfig = SimonlyDynamicConfigOverwrite(window.location.href, config);
  ioc.set('config', overwrittenConfig);

  const simonlyStorage = new SimonlyStorage();

  const simonlyHallOfFameQueries = new SimonlyHallOfFameQueries(db, overwrittenConfig);
  const simonlyMultiplayerHudQueries = new SimonlyMultiplayerHudQueries(db, overwrittenConfig);
  const simonlyMultiplayer = new SimonlyMultiplayer(db, overwrittenConfig.nameOfFamily);

  const simonlyLocalUI = new SimonlyLocalUI(overwrittenConfig.timePerKey);
  const simonlyRemoteUI = new SimonlyRemoteUI(simonlyMultiplayer);
  const simonlyMultiplayerUI = new SimonlyMultiplayerUI(simonlyLocalUI, simonlyRemoteUI);

  const simonlyGame = new SimonlyGame(simonlyMultiplayerUI, overwrittenConfig.numKeys);


  ioc.set('simonlyLocalUI', simonlyLocalUI);
  ioc.set('simonlyGame', simonlyGame);
  ioc.set('simonlyStorage', simonlyStorage);
  ioc.set('queries', simonlyHallOfFameQueries);
  ioc.set('multiplayerHudQueries', simonlyMultiplayerHudQueries);
  ioc.set('simonlyMultiplayer', simonlyMultiplayer);

  Vue.use(vueIoc);
};

export default simonlyIOC;
