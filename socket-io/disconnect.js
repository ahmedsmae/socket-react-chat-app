const SocketEvents = require('../client/src/utils/socket-events');
const { generateMessage } = require('../utils/generate-messages');

module.exports = (io, socket) =>
  socket.on('disconnect', () => {
    io.emit(SocketEvents.MESSAGE, generateMessage('A user has left :('));
  });
