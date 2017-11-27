import SimonlyGame from './SimonlyGame';
import SimonlyUI from './SimonlyUI';
import FakePromise from '../../test/unit/fake-promise';

describe('SimonlyGame', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should exist', () => {
    const game = new SimonlyGame();
    expect(game).to.be.defined;
    expect(game.gameInfo).to.be.defined;
    expect(game.gameInfo.numTurn).to.equal(1);
    expect(game.gameInfo.score).to.equal(0);
  });

  it('runs turn ONE when starting', () => {
    const game = new SimonlyGame();
    game.runTurn = sinon.spy();

    game.start();

    expect(game.runTurn).to.have.been.calledWith(1);
  });

  it('creates a turn with numTurn', () => {
    const game = new SimonlyGame();
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
    const ui = new SimonlyUI();
    const game = new SimonlyGame(ui);
    game.runTurn(3);

    expect(game.gameInfo.numTurn).to.equal(3);
    expect(game.gameInfo.currentTurnKeys.length).to.equal(3);
  });

  it('increases score if you press correctly', () => {
    const ui = new SimonlyUI();
    const game = new SimonlyGame(ui);
    game.gameInfo.numTurn = 2;
    game.gameInfo.currentTurnKeys = [2, 5, 8];

    game.userPressed(2);

    expect(game.gameInfo.score).to.equal(1);

    game.userPressed(5);

    expect(game.gameInfo.score).to.equal(2);
    expect(game.gameInfo.failed).not.to.be.true;
  });

  describe('when press wrong', () => {
    it('sets that you fail ', () => {
      const ui = new SimonlyUI();
      const game = new SimonlyGame(ui);
      ui.roundFailed = () => {};
      game.gameInfo.numTurn = 2;
      game.gameInfo.currentTurnKeys = [2, 5];

      game.userPressed(2);
      game.userPressed(3);

      expect(game.gameInfo.score).to.equal(1);
      expect(game.gameInfo.failed).to.be.true;
    });

    it('tells the UI presenter that you fail', () => {
      const ui = new SimonlyUI();
      const game = new SimonlyGame(ui);
      game.gameInfo.numTurn = 1;
      game.gameInfo.currentTurnKeys = [1];
      ui.roundFailed = sinon.spy();

      game.userPressed(2);

      expect(ui.roundFailed).to.have.been.calledOnce;
    });
  });

  it('tells the UI presenter that round is OK when presses all keys ok', () => {
    const ui = new SimonlyUI();
    sinon.stub(ui, 'roundOk').returns(FakePromise.resolved({}));
    const game = new SimonlyGame(ui);
    game.runTurn = sinon.spy();
    game.gameInfo.numTurn = 2;
    game.gameInfo.currentTurnKeys = [7, 7];

    game.userPressed(7);
    game.userPressed(7);

    expect(ui.roundOk).to.have.been.calledWith(3);
    expect(ui.roundOk).to.have.been.calledOnce;
    expect(game.runTurn).to.have.been.called;
  });
});
