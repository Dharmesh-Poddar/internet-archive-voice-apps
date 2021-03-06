const { expect } = require('chai');
const rewire = require('rewire');

const middleware = rewire('../../../src/actions/_middlewares/feeder-from-slots-scheme');

const mockApp = require('../../_utils/mocking/platforms/app');
const mockFeeders = require('../../_utils/mocking/feeders/index');

describe('actions', () => {
  describe('middlewares', () => {
    let app;
    const feeder = {};
    let feeders;
    const slotScheme = {
      fulfilment: 'feederName',
    };

    beforeEach(() => {
      app = mockApp();

      feeders = mockFeeders({
        getByNameReturn: feeder,
      });
      middleware.__set__('feeders', feeders);
    });

    describe('feeder from playlist', () => {
      it('should return Promise', () => {
        expect(middleware()({ app, slotScheme })).to.have.property('then');
      });

      it('should put feeder in context', () => {
        return middleware()({ app, slotScheme })
          .then(context => {
            expect(context).to.have.property('feeder', feeder);
          });
      });
    });
  });
});
