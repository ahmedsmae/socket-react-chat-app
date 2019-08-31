import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
// import moment

import './message-card.styles.scss';

const MessageCard = ({ message, currentUser }) => {
  const myMessage = currentUser._id === message.ownerid;

  return (
    <div className={`${myMessage ? 'mine' : 'yours'} messages`}>
      <div className='message last'>
        <div className='content'>
          <div className='message-date'>
            <Moment format='h:mm a'>{moment.utc(message.createdAt)}</Moment>
          </div>
          <span className='message-content'>{message.content}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
