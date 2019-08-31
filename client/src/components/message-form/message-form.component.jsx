import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';

import { sendMessage } from '../../utils/socket.functions';

import './message-form.styles.scss';

const MessageForm = ({ currentUser }) => {
  const [message, setMessage] = useState('');

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const date = new Date();
    const msg = {
      ownerid: currentUser._id,
      content: message,
      // there is a date difference
      createdAt: date.setHours(date.getHours() + 4)
    };
    sendMessage(msg);
    setMessage('');
  };

  return (
    <div className='message-form-container'>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Type a message...'
          type='text'
          name='message'
          autoComplete='off'
          value={message}
          onChange={handleChange}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(MessageForm);
