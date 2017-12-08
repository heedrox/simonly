import ioc from '../lib/ioc';
import SimonlyLocalUI from './SimonlyLocalUI';
import SimonlyGame from './SimonlyGame';
import vueIoc from '../lib/vue-ioc';
import SimonlyStorage from './SimonlyStorage';
import { db } from '../lib/db-firebase';
import SimonlyMultiplayerUI from './SimonlyMultiplayerUI';
import SimonlyRemoteUI from './SimonlyRemoteUI.spec';

const simonlyIOC = (Vue) => {
  const simonlyLocalUI = new SimonlyLocalUI();
  const simonlyRemoteUI = new SimonlyRemoteUI();
  const simonlyMultiplayerUI = new SimonlyMultiplayerUI(db, simonlyLocalUI, simonlyRemoteUI);
  const simonlyStorage = new SimonlyStorage();
  const simonlyGame = new SimonlyGame(simonlyMultiplayerUI);
  ioc.set('simonlyLocalUI', simonlyLocalUI);
  ioc.set('simonlyUI', simonlyMultiplayerUI);
  ioc.set('simonlyGame', simonlyGame);
  ioc.set('simonlyStorage', simonlyStorage);
  Vue.use(vueIoc);
};

export default simonlyIOC;
