import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyGo321 from './SimonlyGo321.vue';

Vue.use(VueResource);

describe('SimonlyGo321', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(SimonlyGo321);
    vm = wrapper.vm;
  });

  it('sets ups', () => {
    expect(vm).to.be.defined;
  });
});
