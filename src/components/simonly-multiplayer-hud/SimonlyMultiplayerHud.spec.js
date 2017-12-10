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
});
