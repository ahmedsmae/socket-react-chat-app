const SocketEvents = require('../client/src/utils/socket-events');
const { generateLocationMessage } = require('../utils/generate-messages');

module.exports = (io, socket) =>
  socket.on(SocketEvents.SEND_LOCATION, ({ latitude, longitude }, callback) => {
    io.emit(
      SocketEvents.LOCATION_MESSAGE,
      generateLocationMessage(
        `https://google.com/maps?q=${latitude},${longitude}`
      )
    );
    callback();
  });
