import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import SocketEvents from './utils/socket-events';

import './App.scss';

const socketUrl = 'http://localhost:5000';
// const socket = io();
// socket.emit(SocketEvents.FIRST_CONNECTION, { user: 'Ahmed Afifi' });

// socket.on(SocketEvents.MESSAGE, message => console.log(message));
// socket.on(SocketEvents.LOCATION_MESSAGE, message => console.log(message));

const App = ({ currentUser }) => {
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState([{ text: 'hello' }]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('Socket connected');
    });
    setSocket(socket);
    socket.on(SocketEvents.MESSAGE, message => {
      console.log(message);
      setMessagesList([...messagesList, message]);
    });
  }, []);

  const initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('Socket connected');
    });
    setSocket(socket);
    socket.on(SocketEvents.MESSAGE, message =>
      setMessagesList([...messagesList, message])
    );
  };

  const sendLocation = () => {
    if (!navigator.geolocation)
      return alert('Geolocation is not supported by your browser');

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      socket.emit(
        SocketEvents.SEND_LOCATION,
        { latitude, longitude },
        error => {
          if (error) return console.log(error);

          console.log('Location Sent !');
        }
      );
    });
  };

  const handleChange = event => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    socket.emit(SocketEvents.SEND_MESSAGE, message, error => {
      if (error) return console.log(error);

      console.log('Message Sent!');
    });

    setMessage('');
  };

  return (
    <div className='chat__main'>
      <h2>React Socketio Chat App</h2>
      <div className='chat__messages'>
        {messagesList.map((msg, index) => (
          <p key={index}>{msg.text}</p>
        ))}
      </div>
      <div className='compose'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Type a message'
            name='message'
            value={message}
            onChange={handleChange}
          />
          <button type='submit'>Send</button>
        </form>
        <button className='send-location' type='button' onClick={sendLocation}>
          Send Location
        </button>
      </div>
    </div>
  );
};

export default App;
