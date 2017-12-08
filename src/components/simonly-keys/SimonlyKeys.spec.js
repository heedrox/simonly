import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyKeys from './SimonlyKeys.vue';

Vue.use(VueResource);

describe('SimonlyKeys', () => {
  it('handles keypress', () => {
    const wrapper = mount(SimonlyKeys);
    const vm = wrapper.vm;

    vm.whenUserPress = sinon.spy();
    vm.userPressed({ key: 2 });

    expect(vm.whenUserPress).to.be.calledWith(2);
  });

  it('generates N elements', () => {
    const wrapper = mount(SimonlyKeys, { propsData: { numKeys: 4 } });
    const vm = wrapper.vm;

    expect(vm.$el.getElementsByClassName('key').length).to.equal(4);
  });
});
