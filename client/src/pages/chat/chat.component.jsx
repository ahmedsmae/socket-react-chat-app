import React from 'react';

import UserCard from '../../components/user-card/user-card.component';
import MessageCard from '../../components/message-card/message-card.component';
import MessageForm from '../../components/message-form/message-form';

import './chat.styles.scss';

const Chat = ({ currentUser, contactUser, chat }) => {
  return (
    <div className='chat-page'>
      <UserCard user={contactUser} />
      <div className='messages-container'>
        {chat.messages.map(msg => (
          <MessageCard key={msg._id} message={msg} />
        ))}
      </div>
      <MessageForm />
    </div>
  );
};

export default Chat;
