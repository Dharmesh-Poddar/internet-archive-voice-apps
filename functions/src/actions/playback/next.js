const dialog = require('../../dialog');
const strings = require('../../strings');
const { debug } = require('../../utils/logger')('ia:actions:next');

const helpers = require('./_helpers');

/**
 * handle playback next song request
 *
 * @param app
 */
function handler (app) {
  return helpers.playSong({ app, skip: 'forward' })
    .catch(e => {
      debug('It could be an error:', e);
      return dialog.ask(app, strings.events.playlistIsEnded);
    });
}

module.exports = {
  handler,
};
