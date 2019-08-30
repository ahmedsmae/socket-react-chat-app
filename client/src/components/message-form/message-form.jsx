import React, { useState } from 'react';

import './message-form.scss';

const MessageForm = () => {
  const [message, setMessage] = useState('');

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const handleSubmit = event => {
    event.prevenyDefault();
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

export default MessageForm;
