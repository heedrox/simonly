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
});
