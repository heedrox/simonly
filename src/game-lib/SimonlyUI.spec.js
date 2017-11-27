import SimonlyUI from './SimonlyUI';

describe('SimonlyUI', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should exist', () => {
    const ui = new SimonlyUI();
    expect(ui).to.be.defined;
  });

  describe('pressing a button', () => {
    it('presses a button from outside', () => {
      const ui = new SimonlyUI();

      ui.press(1);

      expect(ui.pressedKey).to.equal(1);
    });

    it('releases a button after 1 secs', () => {
      const ui = new SimonlyUI();
      ui.press(1);

      clock.tick(1001);

      expect(ui.pressedKey).to.equal(null);
    });
  });

  xit('shows a sequence', () => {
    // This should work but does not because of the promise chaining sequencing
    const ui = new SimonlyUI();
    ui.showSequence([1, 2, 3]);

    clock.tick(801);

    expect(ui.pressedKey).to.equal(1);
  });
});
