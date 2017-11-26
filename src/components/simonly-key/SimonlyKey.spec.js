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
    expect(vm.skin).to.equal('');
    expect(vm.pressed).to.be.false;
    expect(vm.position).to.equal(1);
    expect(vm.externallyPressed).to.be.false;
    expect(vm.gameInfo).to.eql({});
  });

  it('sets skin on and off', () => {
    vm.skin = 'juan';

    expect(vm.skinOn).to.equal('/static/key-files/juan-on.png');
    expect(vm.skinOff).to.equal('/static/key-files/juan-off.png');
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

  it('emits keypress event when released', () => {
    vm.$emit = sinon.spy();

    vm.releaseImage();

    expect(vm.$emit).to.have.been.called;
  });

  describe('when being pressed externally', () => {
    it('detects press when its the right position', () => {
      vm.position = 3;
      vm.gameInfo.pressed = 3;

      expect(vm.externallyPressed).to.be.true;
    });
    it('ignores press when its the right position', () => {
      vm.position = 3;
      vm.gameInfo.pressed = 1;

      expect(vm.externallyPressed).to.be.false;
    });
  });
});
