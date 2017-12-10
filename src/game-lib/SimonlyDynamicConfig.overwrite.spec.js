import { SimonlyDynamicConfigOverwrite } from './SimonlyDynamicConfig';

// { numKeys: 2, id: "myId", d: [ { i, a }, { i, a } ] }
const A_CODE_WITH_NUMKEYS_2 = 'eyJpZCI6Im15aWQiLCJkIjpbeyJpIjoiaW1hZ2VvbmUiLCJhIjoiYXVkaW9vbmUifSx7ImkiOiJpbWFnZXR3byIsImEiOiJhdWRpb3R3byJ9XX0%3D';

describe('SimonlyDynamicConfigOverwrite', () => {
  const PARSEABLE_CODES = [
    `https://simon.ly/_/#/${A_CODE_WITH_NUMKEYS_2}`,
    `http://localhost:8080/_/#/${A_CODE_WITH_NUMKEYS_2}`,
  ];

  const UNPARSEABLE_CODES = [
    `http://localhost:8080/#/_${A_CODE_WITH_NUMKEYS_2}`,
    'https://simon.ly/#/familyName',
  ];

  PARSEABLE_CODES.forEach((url) => {
    it(`overwrites numKeys if code is parseable ${url}`, () => {
      const config = {
        numKeys: 3,
        unmodifiedProperty: 'unmodified',
      };

      const newConfig = SimonlyDynamicConfigOverwrite(url, config);

      expect(newConfig.numKeys).to.equal(2);
      expect(newConfig.unmodifiedProperty).to.equal('unmodified');
    });

    it(`overwrites nameOfFamily if code is parseable ${url}`, () => {
      const config = {
        nameOfFamily: 'myname',
        unmodifiedProperty: 'unmodified',
      };

      const newConfig = SimonlyDynamicConfigOverwrite(url, config);

      expect(newConfig.nameOfFamily).to.equal('myid');
      expect(newConfig.unmodifiedProperty).to.equal('unmodified');
    });

    it(`add audio and Image for dataKeys to config if code is parseable ${url}`, () => {
      const config = {
        nameOfFamily: 'myname',
        unmodifiedProperty: 'unmodified',
      };

      const newConfig = SimonlyDynamicConfigOverwrite(url, config);

      expect(newConfig.dataKeys.length).to.equal(2);
    });
  });

  UNPARSEABLE_CODES.forEach((url) => {
    it('does not modify config when code is not parseable', () => {
      const config = {
        numKeys: 3,
        nameOfFamily: 'myname',
        unmodifiedProperty: 'unmodified',
      };

      const newConfig = SimonlyDynamicConfigOverwrite(url, config);

      expect(newConfig).to.eql(config);
    });
  });
});
