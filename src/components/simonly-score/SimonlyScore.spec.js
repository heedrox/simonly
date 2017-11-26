import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyScore from './SimonlyScore.vue';

Vue.use(VueResource);

describe('SimonlyScore', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(SimonlyScore);
    vm = wrapper.vm;
  });

  it('sets ups', () => {
    expect(vm).to.be.defined;
    expect(vm.score).to.equal(0);
  });
});
