import Game from './game';

describe('Game', () => {
  it('should exist', () => {
    const game = new Game();
    expect(game).to.be.defined;
    expect(game.gameInfo).to.be.defined;
    expect(game.gameInfo.numTurn).to.equal(1);
    expect(game.gameInfo.score).to.equal(0);
  });

  describe('pressing a button', () => {
    let clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('presses a button from outside', () => {
      const game = new Game();

      game.press(1);

      expect(game.gameInfo.pressed).to.equal(1);
    });

    it('releases a button after 3 secs', () => {
      const game = new Game();
      game.press(1);

      clock.tick(1001);

      expect(game.gameInfo.pressed).to.equal(null);
    });
  });

  xdescribe('when it starts', () => {
    let clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('starts with one turn', () => {
      const game = new Game();
      game.start();

      clock.tick(999);

      expect(game.gameInfo.pressed).to.equal(4);
    });
  });

  it('creates a turn with numTurn', () => {
    const game = new Game();
    game.gameInfo.numTurn = 5;
    game.gameInfo.currentTurnKeys = [1, 2, 3, 4];
    game.addTurnKeys();

    expect(game.gameInfo.currentTurnKeys.length).to.equal(5);
    expect(game.gameInfo.currentTurnKeys[0]).to.equal(1);
    expect(game.gameInfo.currentTurnKeys[1]).to.equal(2);
    expect(game.gameInfo.currentTurnKeys[2]).to.equal(3);
    expect(game.gameInfo.currentTurnKeys[3]).to.equal(4);
  });

  it('runs a turn', () => {
    const game = new Game();
    game.runTurn(3);

    expect(game.gameInfo.numTurn).to.equal(3);
    expect(game.gameInfo.currentTurnKeys.length).to.equal(3);
  });

  it('increases score if you press correctly', () => {
    const game = new Game();
    game.gameInfo.numTurn = 2;
    game.gameInfo.currentTurnKeys = [2, 5];

    game.userPressed(2);

    expect(game.gameInfo.score).to.equal(1);

    game.userPressed(5);

    expect(game.gameInfo.score).to.equal(2);
    expect(game.gameInfo.failed).not.to.be.true;
  });

  it('sets that you fail if you press wrong', () => {
    const game = new Game();
    game.gameInfo.numTurn = 2;
    game.gameInfo.currentTurnKeys = [2, 5];

    game.userPressed(2);
    game.userPressed(3);

    expect(game.gameInfo.score).to.equal(1);
    expect(game.gameInfo.failed).to.be.true;
  });

  it('runs next turn when user presses all keys', () => {
    const game = new Game();
    game.runTurn = sinon.spy();
    game.gameInfo.numTurn = 2;
    game.gameInfo.currentTurnKeys = [7, 7];

    game.userPressed(7);
    game.userPressed(7);

    expect(game.runTurn).to.have.been.calledWith(3);
  });
});
