import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyKey from './SimonlyKey.vue';

Vue.use(VueResource);

describe('SimonlyKey', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(SimonlyKey);
    vm = wrapper.vm;
  });

  it('sets ups', () => {
    expect(vm).to.be.defined;
    expect(vm.skinOff).to.equal('');
    expect(vm.skinOn).to.equal('');
    expect(vm.pressed).to.be.false;
    expect(vm.position).to.equal(1);
  });

  it('sets pressed to true, when pressed', () => {
    vm.pressImage();

    expect(vm.pressed).to.be.true;
  });

  it('sets pressed to false, when released', () => {
    vm.pressed = true;

    vm.releaseImage();

    expect(vm.pressed).to.be.false;
  });
});
