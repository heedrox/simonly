import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyMusic from './SimonlyMusic.vue';

Vue.use(VueResource);

describe('SimonlyMusic', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(SimonlyMusic);
    vm = wrapper.vm;
  });

  it('sets ups', () => {
    expect(vm).to.be.defined;
  });
});
