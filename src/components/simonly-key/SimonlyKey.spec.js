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
    expect(vm.skin).to.equal(0);
    expect(vm.pressed).to.be.false;
    expect(vm.position).to.equal(1);
    expect(vm.externallyPressed).to.be.false;
  });

  it('sets skin src', () => {
    vm.skin = '1';

    expect(vm.src).to.contain('/static/key-files/1.png');
  });

  it('overwrites skin from dataKeys', () => {
    vm.overwriteSkin = 'https://otherdomain.com/skin/1.png';

    expect(vm.src).to.equal('https://otherdomain.com/skin/1.png');
  });

  it('get audio src from number', () => {
    vm.skin = '1';

    expect(vm.getAudioSrc()).to.contains('/static/key-files/1.m4a');
  });

  it('overwrites audio from dataKeys', () => {
    vm.overwriteAudio = 'https://otherdomain.com/audio/1.m4a';

    expect(vm.getAudioSrc()).to.equal('https://otherdomain.com/audio/1.m4a');
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
