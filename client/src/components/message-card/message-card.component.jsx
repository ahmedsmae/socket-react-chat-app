import React from 'react';
// import moment

import './message-card.styles.scss';

const MessageCard = ({ message, currentUser }) => {
  const myMessage = currentUser._id === message.ownerid;

  return (
    <div
      className={`message-card ${myMessage ? 'my-message' : 'other-message'}`}
    >
      <p>{message.content}</p>
      <span>{message.createdAt}</span>
    </div>
  );
};

export default MessageCard;
