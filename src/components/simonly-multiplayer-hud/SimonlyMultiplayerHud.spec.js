import { mount } from 'avoriaz';
import SimonlyMultiplayerHud from './SimonlyMultiplayerHud.vue';

describe('SimonlyMultiplayerHud', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(SimonlyMultiplayerHud);
    vm = wrapper.vm;
  });

  it('sets up', () => {
    expect(vm).to.be.defined;
  });

  xit('sorts players based on score - no way to make it work without VueFire?', (done) => {
    vm.$options.players = [{}];

    vm.$nextTick(() => {
      expect(vm.sortedPlayers).to.eql([{}]);
      done();
    });
  });
});
