import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyWelcome from './SimonlyWelcome.vue';
import SimonlyStorage from '../../game-lib/SimonlyStorage';

Vue.use(VueResource);

describe('SimonlyWelcome', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(SimonlyWelcome);
    vm = wrapper.vm;
  });

  it('sets ups', () => {
    expect(vm).to.be.defined;
  });

  describe('on clicking play', () => {
    it('does not start if name is empty', () => {
      vm.onClick = sinon.spy();
      vm.name = '';

      vm.clickPlay();

      expect(vm.onClick).not.to.be.called;
    });

    it('saves name on SimonlyStorage', (done) => {
      vm.name = 'aName';
      vm.onClick = () => { };
      const storage = new SimonlyStorage();

      vm.clickPlay();

      storage.get('name')
        .then((value) => {
          expect(value).to.be.equal('aName');
          done();
        });
    });
  });

  it('loads back name when starting', (done) => {
    const storage = new SimonlyStorage();
    storage.set('name', 'otherName')
      .then(() => {
        wrapper = mount(SimonlyWelcome);
        vm = wrapper.vm;

        vm.$nextTick(() => {
          expect(vm.name).to.be.equal('otherName');
          done();
        });
      });
  });
});
