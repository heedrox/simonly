import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyKey from './SimonlyKey.vue';
import FakePromise from '../../../test/unit/fake-promise';

Vue.use(VueResource);

const audioWithPaused = paused => ({
  paused,
  play: () => FakePromise.resolved({}),
  pause: () => FakePromise.resolved({}),
  load: () => {},
});

describe('SimonlyKey', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(SimonlyKey);
    vm = wrapper.vm;
    vm.$refs.audio = audioWithPaused(true);
  });

  it('sets ups', () => {
    expect(vm).to.be.defined;
    expect(vm.skin).to.equal('');
    expect(vm.pressed).to.be.false;
    expect(vm.position).to.equal(1);
    expect(vm.externallyPressed).to.be.false;
  });

  it('sets skin on and off', () => {
    vm.skin = 'juan';

    expect(vm.skinOn).to.equal('/static/key-files/juan-on.png');
    expect(vm.skinOff).to.equal('/static/key-files/juan-off.png');
  });

  describe('when being pressed by user', () => {
    let clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('sets pressed to true', () => {
      vm.playAudio = () => FakePromise.resolved({});
      vm.pressImage();

      expect(vm.pressed).to.be.true;
    });

    it('sets pressed to false after 1000 sec', () => {
      vm.$refs.audio = audioWithPaused(true);
      vm.pressed = true;

      vm.pressImage();
      clock.tick(1001);

      expect(vm.pressed).to.be.false;
    });

    it('emits keypress event when released', () => {
      vm.$emit = sinon.spy();
      vm.$refs.audio = audioWithPaused(true);

      vm.pressImage();
      clock.tick(1001);

      expect(vm.$emit).to.have.been.called;
    });
  });

  describe('when being pressed externally', () => {
    it('detects press when its the right position', () => {
      vm.position = 3;
      vm.externallyPressedKey = 3;

      expect(vm.externallyPressed).to.be.true;
    });
    it('ignores press when its the right position', () => {
      vm.position = 3;
      vm.externallyPressedKey = 1;

      expect(vm.externallyPressed).to.be.false;
    });
  });
});
