import React, { Fragment } from 'react';
import { subscribeToChat } from '../../utils/socket.functions';

import MessageCard from '../message-card/message-card.component';
import MessageForm from '../message-form/message-form.component';

import './chat-socket.styles.scss';

class ChatSocket extends React.Component {
  state = { messages: null };

  setMessages = messages => this.setState({ messages });

  isScrolledIntoView(el) {
    if (el) {
      // this func is to check if an element is visible within the viewport
      var rect = el.getBoundingClientRect();
      var elemTop = rect.top;
      var elemBottom = rect.bottom;

      // Only completely visible elements return true:
      var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
      // Partially visible elements return true:
      //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
      return isVisible;
    }
  }

  scrollToBottom = () => {
    if (this.isScrolledIntoView(this.messagesEnd)) {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
  };

  componentDidMount() {
    const { currentChatId } = this.props;
    subscribeToChat(currentChatId, (err, messages) => {
      if (err) throw err;
      this.setMessages(messages);

      this.scrollToBottom();
    });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { currentUser } = this.props;
    const { messages } = this.state;

    return (
      <Fragment>
        <div id='messages' className='messages-container'>
          {messages &&
            messages.map(msg => (
              <MessageCard
                key={msg._id}
                message={msg}
                currentUser={currentUser}
              />
            ))}
        </div>
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => {
            this.messagesEnd = el;
          }}
        ></div>
        <MessageForm />
      </Fragment>
    );
  }
}

export default ChatSocket;
