import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyBoard from './SimonlyBoard.vue';

Vue.use(VueResource);

describe('SimonlyBoard', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(SimonlyBoard);
    vm = wrapper.vm;
  });

  it('sets ups', () => {
    expect(vm).to.be.defined;
    expect(vm.game).to.be.defined;
  });

  it('restarts', () => {
    vm.game.gameInfo.numTurn = 5;

    vm.restart();

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

  describe('hall of fame showing or hiding is controlled', () => {
    let clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

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
