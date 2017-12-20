import SimonlyGame from './SimonlyGame';
import FakePromise from '../../test/unit/fake-promise';

const SimonlyUIMock = () => ({
  showSequence: () => {},
  roundFailed: () => {},
  roundOk: () => {},
  updateScore: () => {},
  resetTurn: () => {},
});

describe('SimonlyGame', () => {
  let clock;
  let ui;
  let game;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    ui = SimonlyUIMock();
    game = new SimonlyGame(ui, 10);
  });

  afterEach(() => {
    clock.restore();
  });

  it('should exist', () => {
    expect(game).to.be.defined;
    expect(game.gameInfo).to.be.defined;
    expect(game.gameInfo.numTurn).to.equal(0);
    expect(game.gameInfo.score).to.equal(0);
  });

  it('runs turn ONE when starting', () => {
    ui.updateScore = sinon.spy();
    game.runTurn = sinon.spy();

    game.start();

    expect(game.runTurn).to.have.been.calledWith(1);
    expect(ui.updateScore).to.be.calledWith(0);
  });

  it('creates a turn with numTurn', (done) => {
    game.gameInfo.numTurn = 5;
    game.gameInfo.currentTurnKeys = [1, 2, 3, 4];
    game.addTurnKeys()
      .then(() => {
        expect(game.gameInfo.currentTurnKeys.length).to.equal(5);
        expect(game.gameInfo.currentTurnKeys[0]).to.equal(1);
        expect(game.gameInfo.currentTurnKeys[1]).to.equal(2);
        expect(game.gameInfo.currentTurnKeys[2]).to.equal(3);
        expect(game.gameInfo.currentTurnKeys[3]).to.equal(4);
        done();
      });
  });

  it('runs a turn', (done) => {
    game.simonlyUI.showSequence = () => Promise.resolve({});
    game.runTurn(3)
      .then(() => {
        expect(game.gameInfo.numTurn).to.equal(3);
        expect(game.gameInfo.currentTurnKeys.length).to.equal(3);
        done();
      });
  });

  it('increases score if you press correctly', () => {
    ui.updateScore = sinon.spy();
    game.gameInfo.numTurn = 2;
    game.gameInfo.currentTurnKeys = [2, 5, 8];

    game.userPressed(2);

    expect(game.gameInfo.score).to.equal(1);

    game.userPressed(5);

    expect(game.gameInfo.score).to.equal(2);
    expect(game.gameInfo.failed).not.to.be.true;

    expect(ui.updateScore).to.be.calledTwice;
  });

  describe('when press wrong', () => {
    beforeEach(() => {
      ui.roundFailed = sinon.spy();
      game.gameInfo.numTurn = 2;
      game.gameInfo.currentTurnKeys = [2, 5];

      game.userPressed(2);
      game.userPressed(3);
    });
    it('sets that you fail ', () => {
      expect(game.gameInfo.score).to.equal(1);
      expect(game.gameInfo.failed).to.be.true;
    });

    it('tells the UI presenter that you fail with the key that you should have pressed and the num turn', () => {
      expect(ui.roundFailed).to.have.been.calledOnce;
      expect(ui.roundFailed).to.have.been.calledWith(5, 2);
    });
  });

  it('tells the UI presenter that round is OK when presses all keys ok', () => {
    const NUM_TURN = 2;
    sinon.stub(ui, 'roundOk').returns(FakePromise.resolved({}));
    game.runTurn = sinon.spy();
    game.gameInfo.numTurn = NUM_TURN;
    game.gameInfo.currentTurnKeys = [6, 7];

    game.userPressed(6);
    game.userPressed(7);

    expect(ui.roundOk).to.have.been.calledWith(NUM_TURN);
    expect(ui.roundOk).to.have.been.calledOnce;
    expect(game.runTurn).to.have.been.called;
  });
});
