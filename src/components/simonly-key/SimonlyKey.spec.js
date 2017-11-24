import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyKey from './SimonlyKey.vue';

Vue.use(VueResource);

describe('Envelope.vue', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(SimonlyKey);
    vm = wrapper.vm;
  });
  it('sets ups', () => {
    expect(vm).to.be.defined;
  });
});
