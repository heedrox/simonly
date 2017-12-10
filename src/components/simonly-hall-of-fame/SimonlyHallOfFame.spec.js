import Vue from 'vue';
import { mount } from 'avoriaz';
import VueResource from 'vue-resource';
import SimonlyHallOfFame from './SimonlyHallOfFame.vue';
import SimonlyStorage from '../../game-lib/SimonlyStorage';
import simonlyIOC from '../../game-lib/SimonlyIOC';
import ioc from '../../lib/ioc';

Vue.use(VueResource);

describe('SimonlyHallOfFame', () => {
  const threeRows = () => [{ name: 'jone', score: 28 }, { name: 'juan', score: 25 }, { name: 'luis', score: 23 }];

  let wrapper;
  let vm;

  beforeEach(() => {
    simonlyIOC(Vue);
    ioc.get('simonlyStorage').clear();
    wrapper = mount(SimonlyHallOfFame);
    vm = wrapper.vm;
  });

  it('sets ups', () => {
    expect(vm).to.be.defined;
  });

  it('fills rows with empty ones until 7', () => {
    vm.hallRows = [{ name: 'jone', score: 23 }, { name: 'juan', score: 23 }, { name: 'luis', score: 23 }];

    expect(vm.hallRowsWithEmpty).to.length(7);
  });

  it('caches the name when mounted', (done) => {
    const simonlyStorage = new SimonlyStorage();
    simonlyStorage.set('name', 'SuperJordi');

    vm.$mount();

    vm.$nextTick(() => {
      expect(vm.username).to.equal('SuperJordi');
      done();
    });
  });

  describe('highlights the current game if won', () => {
    const CURRENT_USER = 'Jordi';
    const CURRENT_SCORE = 23;

    const TEST_DATA = [
      { row: { name: CURRENT_USER, score: CURRENT_SCORE }, expectedResult: true },
      { row: { name: 'notTheUser', score: 23 }, expectedResult: false },
      { row: { name: CURRENT_USER, score: 12 }, expectedResult: false },

    ];
    TEST_DATA.forEach((data) => {
      it(`knows if a row is the current game for user / score: ${data.row.name} / ${data.row.score}`, () => {
        vm.username = CURRENT_USER;
        vm.score = CURRENT_SCORE;

        expect(vm.isRowCurrentGame(data.row)).to.equal(data.expectedResult);
      });
    });
  });

  describe('saves name when hall of fame shows up / mounts', () => {
    beforeEach(() => {
      vm.queries = {
        top10: () => [],
        addTop10: sinon.spy(),
      };
      vm.hallRows = threeRows();
      vm.$firebaseRefs = { hallRows: { } };
      ioc.get('simonlyStorage').set('name', 'jordi');
    });

    afterEach(() => {
      ioc.get('simonlyStorage').clear();
    });

    it('saves the game when score greater than zero', (done) => {
      vm.score = 1;

      vm.$mount();

      vm.$nextTick(() => {
        expect(vm.queries.addTop10).to.be.called;
        expect(vm.queries.addTop10.getCall(0).args[1]).to.equal('jordi');
        expect(vm.queries.addTop10.getCall(0).args[2]).to.equal(1);
        done();
      });
    });

    it('does not save the game if score is zero', (done) => {
      vm.score = 0;

      vm.$mount();

      vm.$nextTick(() => {
        expect(vm.queries.addTop10).not.to.be.called;
        done();
      });
    });
  });
});
