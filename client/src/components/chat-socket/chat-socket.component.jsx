import React, { Fragment } from 'react';
import { subscribeToChat } from '../../utils/socket.functions';

import MessageCard from '../message-card/message-card.component';
import MessageForm from '../message-form/message-form.component';

import './chat-socket.styles.scss';

class ChatSocket extends React.Component {
  state = { messages: null };

  setMessages = messages => this.setState({ messages });

  componentDidMount() {
    const { currentChatId } = this.props;
    subscribeToChat(currentChatId, (err, messages) => {
      if (err) throw err;
      this.setMessages(messages);
    });
  }

  render() {
    const { currentUser } = this.props;
    const { messages } = this.state;

    return (
      <Fragment>
        <div className='messages-container'>
          {messages &&
            messages.map(msg => (
              <MessageCard
                key={msg._id}
                message={msg}
                currentUser={currentUser}
              />
            ))}
        </div>

        <MessageForm />
      </Fragment>
    );
  }
}

export default ChatSocket;
