import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyBoard from './SimonlyBoard.vue';

Vue.use(VueResource);

describe('SimonlyBoard', () => {
  let wrapper;
  let vm;
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    wrapper = mount(SimonlyBoard);
    vm = wrapper.vm;
  });

  afterEach(() => {
    clock.restore();
  });

  it('sets ups', () => {
    expect(vm).to.be.defined;
    expect(vm.game).to.be.defined;
  });

  it('restarts after 321 page', () => {
    vm.game.gameInfo.numTurn = 5;

    vm.restart();
    clock.tick(3001);

    expect(vm.game.gameInfo.numTurn).to.equal(1);
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
      vm.game.simonlyUI.theRightKey = 3;

      vm.$nextTick(() => {
        clock.tick(5005);
        expect(vm.currentState).to.equal('hall-of-fame');
        done();
      });
    });
  });
});
