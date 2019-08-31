import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
// import moment

import './message-card.styles.scss';

const MessageCard = ({ message, currentUser }) => {
  const myMessage = currentUser._id === message.ownerid;

  return (
    <div
      className={`message-card ${myMessage ? 'my-message' : 'other-message'}`}
    >
      <Moment className='message-date' format='h:mm a'>
        {moment.utc(message.createdAt)}
      </Moment>
      <span className='message-content'>{message.content}</span>
    </div>
  );
};

export default MessageCard;
