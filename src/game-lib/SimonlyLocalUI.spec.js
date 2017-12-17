import SimonlyLocalUI from './SimonlyLocalUI';
import timeoutUtil from '../lib/timeoutUtil';
import FakePromise from '../../test/unit/fake-promise';

const mockAudio = () => ({ volume: 0, play: () => {} });

describe('SimonlyLocalUI', () => {
  let clock;

  let ui;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    ui = new SimonlyLocalUI(1000);
  });

  afterEach(() => {
    clock.restore();
  });

  it('should exist', () => {
    expect(ui).to.be.defined;
  });

  describe('shows which key should be pressed', () => {
    it('presses a button from outside', () => {
      ui.showKey(1);

      expect(ui.pressedKey).to.equal(1);
    });

    it('releases a button after +1 secs', () => {
      timeoutUtil.syncTimeout = () => FakePromise.resolved({});
      ui.showKey(1);

      clock.tick(600);
      clock.tick(1500);

      expect(ui.pressedKey).to.equal(null);
    });
  });

  describe('controls lock of keys / readonly status of them', () => {
    it('locks keys when shows a sequence', () => {
      ui.blockKeys = false;

      ui.showSequence([1, 2, 3]);

      expect(ui.blockKeys).to.be.true;
    });

    xit('unlocks keys after showing sequence', () => {
      // cannot develop this because of same problem as lower problem
    });

    it('locks keys when round ok', () => {
      ui.roundOkAudio = mockAudio();
      ui.blockKeys = false;

      ui.roundOk();

      expect(ui.blockKeys).to.be.true;
    });
  });

  xit('shows a sequence', () => {
    // This should work but does not because of the promise chaining sequencing
    ui.showSequence([1, 2, 3]);

    clock.tick(801);

    expect(ui.pressedKey).to.equal(1);
  });

  describe('handles the result of the round', () => {
    it('plays ko audio when failed', () => {
      const audio = mockAudio();
      audio.play = sinon.spy();
      ui.setKoAudio(audio);

      ui.roundFailed();

      expect(audio.play).to.have.been.called;
    });

    it('sets theRightKey to show which one was right', () => {
      const audio = mockAudio();
      audio.play = sinon.spy();
      ui.setKoAudio(audio);

      ui.roundFailed(2);

      expect(ui.theRightKey).to.equal(2);
    });

    it('plays ok audio and waits 1 sec and follows', () => {
      const audio = mockAudio();
      audio.play = sinon.spy();
      ui.setOkAudio(audio);
      ui.roundOk();

      clock.tick(1000);

      expect(audio.play).to.have.been.called;
    });

    it('restarts theRightKey to null not to show anything', () => {
      const audio = mockAudio();
      audio.play = sinon.spy();
      ui.setOkAudio(audio);

      ui.roundOk();

      clock.tick(1000);

      expect(ui.theRightKey).to.be.null;
    });
  });

  it('updates and stores score', () => {
    ui.updateScore(10);

    expect(ui.score).to.equal(10);
  });
});
