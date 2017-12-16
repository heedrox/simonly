import SimonlyMultiplayer from './SimonlyMultiplayer';

const dbMock = () => ({
  ref: () => ({
    on: () => {
    },
    once: () => {
    },
  }),
});

const userInTurnOk = (name, numTurn) => ({ name, lastFinishedTurn: { numTurn, isOk: true } });
const userKo = name => ({ name, lastFinishedTurn: { numTurn: 2, isOk: false } });

const executePreviousPromiseBeforeLeaving = (done) => {
  new Promise((resolve) => {
    resolve();
  }).then(() => {
    done();
  });
};

describe('SimonlyMultiplayer', () => {
  let simonlyMultiplayer;

  beforeEach(() => {
    simonlyMultiplayer = new SimonlyMultiplayer(dbMock(), 'testFamily');
  });

  describe('handles waiting for all users to finish the round ', () => {
    it('resolves when no  players', (done) => {
      simonlyMultiplayer.waitForUsersFinishRound(3)
        .then(() => {
          expect(true).to.eql(true);
          done();
        });

      simonlyMultiplayer.onPlayersChange([]);
    });
    it('resolves when all players reach the round', (done) => {
      simonlyMultiplayer.waitForUsersFinishRound(3)
        .then(() => {
          expect(true).to.eql(true);
          done();
        });

      simonlyMultiplayer.onPlayersChange([userInTurnOk('Jordi', 3), userInTurnOk('Jordi2', 3), userInTurnOk('Jordi3', 3)]);
    });

    it('does not resolve when one player does not reach the round', (done) => {
      simonlyMultiplayer.waitForUsersFinishRound(3)
        .then(() => {
          expect(false).to.equal(true); // should never get here
        });

      simonlyMultiplayer.onPlayersChange([userInTurnOk('Jordi', 2), userInTurnOk('Juan', 3)]);

      // super trick: this allows to solve first the previous promise, and handle the done
      executePreviousPromiseBeforeLeaving(done);
    });
  });

  describe('handles waiting for all users to finish the game when user fails ', () => {
    it('resolves when no  players', (done) => {
      simonlyMultiplayer.waitForUsersFinishGame()
        .then(() => {
          expect(true).to.eql(true);
          done();
        });

      simonlyMultiplayer.onPlayersChange([]);
    });

    it('resolves when all players fail', (done) => {
      simonlyMultiplayer.waitForUsersFinishGame()
        .then(() => {
          expect(true).to.eql(true);
          done();
        });

      simonlyMultiplayer.onPlayersChange([userKo('Jordi'), userKo('Jordi2'), userKo('Jordi3')]);
    });

    it('does not resolve when one of them is still not KO', (done) => {
      simonlyMultiplayer.waitForUsersFinishGame()
        .then(() => {
          expect(false).to.equal(true); // should never get here
        });

      simonlyMultiplayer.onPlayersChange([userInTurnOk('Jordi', 2), userKo('Julian')]);

      // super trick: this allows to solve first the previous promise, and handle the done
      executePreviousPromiseBeforeLeaving(done);
    });
  });
});
