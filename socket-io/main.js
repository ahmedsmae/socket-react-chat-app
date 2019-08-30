const SocketEvents = require('../client/src/utils/socket-events');
const { generateMessage } = require('../utils/generate-messages');

module.exports = io =>
  io.on('connection', socket => {
    console.log('New WebSocket connection | id = ', socket.id);
    // will be sent to that specific connection
    socket.emit(SocketEvents.MESSAGE, generateMessage('Welcome!'));
    // will be sent to every connection exept that specific connection
    socket.broadcast.emit(
      SocketEvents.MESSAGE,
      generateMessage('A new user has joined ;)')
    );

    socket.on(SocketEvents.FIRST_CONNECTION, ({ user }) => {
      console.log(user);
    });

    require('./send-message')(io, socket);
    require('./send-location')(io, socket);
    require('./disconnect')(io, socket);
  });
