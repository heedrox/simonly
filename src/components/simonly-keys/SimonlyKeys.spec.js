import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyKeys from './SimonlyKeys.vue';

Vue.use(VueResource);

describe('SimonlyKeys', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(SimonlyKeys);
    vm = wrapper.vm;
  });

  it('sets ups', () => {
    expect(vm).to.be.defined;
  });

  it('handles keypress', () => {
    vm.game = { userPressed: sinon.spy() };
    vm.userPressed({ key: 2 });

    expect(vm.game.userPressed).to.be.calledWith(2);
  });
});