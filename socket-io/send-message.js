const Filter = require('bad-words');

const SocketEvents = require('../client/src/utils/socket-events');
const { generateMessage } = require('../utils/generate-messages');

module.exports = (io, socket) =>
  socket.on(SocketEvents.SEND_MESSAGE, (message, callback) => {
    // will be sent to all connections

    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }

    io.emit(SocketEvents.MESSAGE, generateMessage(message));
    callback();
  });
