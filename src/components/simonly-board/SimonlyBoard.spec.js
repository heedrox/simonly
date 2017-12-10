import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyBoard from './SimonlyBoard.vue';
import SimonlyGame from '../../game-lib/SimonlyGame';
import SimonlyStorage from '../../game-lib/SimonlyStorage';
import vueIoc from '../../lib/vue-ioc';
import ioc from '../../lib/ioc';

Vue.use(VueResource);

const SimonlyUIMock = () => ({
  theRightKey: 0,
  showSequence: () => {
  },
  roundFailed: () => {
  },
  roundOk: () => {
  },
  updateScore: () => {
  },
  setOkAudio: () => {
  },
  setKoAudio: () => {
  },
});

const simonlyMockIOC = () => {
  const localUI = SimonlyUIMock();
  const multiplayerUI = SimonlyUIMock();
  ioc.set('simonlyLocalUI', localUI);
  ioc.set('simonlyUI', multiplayerUI);
  ioc.set('simonlyGame', new SimonlyGame(multiplayerUI));
  ioc.set('simonlyStorage', new SimonlyStorage());
  ioc.set('queries', {
    top10: () => [],
    addTop10: () => [],
  });

  Vue.use(vueIoc);
};

describe('SimonlyBoard', () => {
  let wrapper;
  let vm;
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    simonlyMockIOC();
    ioc.set('config', { numKeys: 4, nameOfFamily: 'testFamily' });
    wrapper = mount(SimonlyBoard);
    vm = wrapper.vm;
  });

  afterEach(() => {
    clock.restore();
  });

  it('sets ups', () => {
    expect(vm).to.be.defined;
    expect(vm.simonlyGame).to.be.defined;
  });

  it('restarts after 321 page', () => {
    vm.simonlyGame.gameInfo.numTurn = 5;

    vm.restart();
    clock.tick(3001);

    expect(vm.simonlyGame.gameInfo.numTurn).to.equal(1);
  });

  describe('welcome page', () => {
    it('shows at beginning', () => {
      expect(vm.currentState).to.equal('welcome');
    });

    it('hides when start', () => {
      vm.restart();

      expect(vm.currentState).not.to.equal('welcome');
    });
  });

  describe('3, 2, 1 page', () => {
    it('shows when restarting', () => {
      vm.restart();

      expect(vm.currentState).to.equal('321');
    });

    it('hides after 3 secs', () => {
      vm.restart();

      clock.tick(3001);

      expect(vm.currentState).to.equal('playing');
    });
  });

  describe('hall of fame showing or hiding is controlled', () => {
    it('shows when loosing', (done) => {
      vm.hallRows = [];
      vm.simonlyLocalUI.theRightKey = 3;

      vm.$nextTick(() => {
        clock.tick(5005);
        expect(vm.currentState).to.equal('hall-of-fame');
        done();
      });
    });
  });
});
