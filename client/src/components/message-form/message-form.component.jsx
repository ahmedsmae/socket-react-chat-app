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
    const msg = { ownerid: currentUser._id, content: message };
    sendMessage(msg);
    setMessage('');
  };

  return (
    <div className='message-form-container'>
      <form onSubmit={handleSubmit} className='message-form'>
        <input
          type='text'
          name='message'
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
