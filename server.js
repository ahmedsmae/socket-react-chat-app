const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const connectMongoDB = require('./database/mongo-db');
connectMongoDB();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routers/api/users'));
app.use('/api/chats', require('./routers/api/chats'));

// contains all event handlers
require('./socket-io/main')(io);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

server.listen(process.env.PORT, () => {
  console.log(`Server is up and running on port ${process.env.PORT}`);
});
