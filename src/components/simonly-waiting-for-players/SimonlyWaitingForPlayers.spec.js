import { mount } from 'avoriaz';
import SimonlyWaitingForPlayers from './SimonlyWaitingForPlayers.vue';

describe('SimonlyWaitingForPlayers', () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(SimonlyWaitingForPlayers);
    vm = wrapper.vm;
  });

  it('sets up', () => {
    expect(vm).to.be.defined;
  });

  it('emits players:ready when all players are in waiting-for-players state', () => {
    const players = [{ name: 'jordi', state: 'playing' }, { name: 'juan', state: 'waiting-for-players' }];
    vm.$emit = sinon.spy();

    vm.checkReady(players);

    expect(vm.$emit).not.to.have.been.calledWith('players:ready');
  });

  it('emits players:ready when all players are in waiting-for-players state', () => {
    const players = [{ name: 'jordi', state: 'waiting-for-players' }, { name: 'juan', state: 'waiting-for-players' }];
    vm.$emit = sinon.spy();

    vm.checkReady(players);

    expect(vm.$emit).to.have.been.calledWith('players:ready');
  });

  it('does not emit players:ready if no players still', () => {
    const players = [];
    vm.$emit = sinon.spy();

    vm.checkReady(players);

    expect(vm.$emit).not.to.have.been.calledWith('players:ready');
  });
});
