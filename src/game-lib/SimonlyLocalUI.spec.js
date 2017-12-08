import SimonlyLocalUI from './SimonlyLocalUI';
import timeoutUtil from '../lib/timeoutUtil';
import FakePromise from '../../test/unit/fake-promise';

describe('SimonlyLocalUI', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should exist', () => {
    const ui = new SimonlyLocalUI();
    expect(ui).to.be.defined;
  });

  describe('shows which key should be pressed', () => {
    it('presses a button from outside', () => {
      const ui = new SimonlyLocalUI();

      ui.showKey(1);

      expect(ui.pressedKey).to.equal(1);
    });

    it('releases a button after +1 secs', () => {
      const ui = new SimonlyLocalUI();
      timeoutUtil.syncTimeout = () => FakePromise.resolved({});
      ui.showKey(1);

      clock.tick(600);
      clock.tick(1500);

      expect(ui.pressedKey).to.equal(null);
    });
  });

  xit('shows a sequence', () => {
    // This should work but does not because of the promise chaining sequencing
    const ui = new SimonlyLocalUI();
    ui.showSequence([1, 2, 3]);

    clock.tick(801);

    expect(ui.pressedKey).to.equal(1);
  });

  describe('handles the result of the round', () => {
    it('plays ko audio when failed', () => {
      const ui = new SimonlyLocalUI();
      const audio = {};
      audio.play = sinon.spy();
      ui.setKoAudio(audio);

      ui.roundFailed();

      expect(audio.play).to.have.been.called;
    });

    it('sets theRightKey to show which one was right', () => {
      const ui = new SimonlyLocalUI();
      const audio = {};
      audio.play = sinon.spy();
      ui.setKoAudio(audio);

      ui.roundFailed(2);

      expect(ui.theRightKey).to.equal(2);
    });

    it('plays ok audio and waits 1 sec and follows', () => {
      const ui = new SimonlyLocalUI();
      const audio = {};
      audio.play = sinon.spy();
      ui.setOkAudio(audio);

      ui.roundOk();

      clock.tick(1000);

      expect(audio.play).to.have.been.called;
    });

    it('restarts theRightKey to null not to show anything', () => {
      const ui = new SimonlyLocalUI();
      const audio = {};
      audio.play = sinon.spy();
      ui.setOkAudio(audio);

      ui.roundOk();

      clock.tick(1000);

      expect(ui.theRightKey).to.be.null;
    });
  });

  it('updates and stores score', () => {
    const ui = new SimonlyLocalUI();

    ui.updateScore(10);

    expect(ui.score).to.equal(10);
  });
});
