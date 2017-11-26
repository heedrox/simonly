import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyButton from './SimonlyButton.vue';

Vue.use(VueResource);

describe('SimonlyButton', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(SimonlyButton);
    vm = wrapper.vm;
  });

  it('sets ups', () => {
    expect(vm).to.be.defined;
  });
});
