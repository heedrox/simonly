import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyScore from './SimonlyScore.vue';

Vue.use(VueResource);

describe('SimonlyScore', () => {
  let wrapper;
  let vm;

  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  beforeEach(() => {
    wrapper = mount(SimonlyScore);
    vm = wrapper.vm;
  });

  it('sets ups', () => {
    expect(vm).to.be.defined;
    expect(vm.score).to.equal(0);
    expect(vm.animating).to.be.false;
  });

  it('animates when score changes', (done) => {
    vm.score = 5;
    vm.$nextTick(() => {
      expect(vm.animating).to.be.true;
      clock.tick(1001);
      expect(vm.animating).to.be.false;
      done();
    });
  });
});
