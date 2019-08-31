import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadingCurrentChatStart } from '../../redux/current-chat/current-chat.actions';

import { selectSelectedUser } from '../../redux/users-list/users-list.selectors';
import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { selectCurrentChatId } from '../../redux/current-chat/current-chat.selectors';

import UserCard from '../../components/user-card/user-card.component';
import ChatSocket from '../../components/chat-socket/chat-socket.component';

import './chat.styles.scss';

const Chat = ({
  currentUser,
  selectedUser,
  currentChatId,
  loadingCurrentChatStart
}) => {
  useEffect(() => {
    loadingCurrentChatStart(selectedUser._id);
  }, [loadingCurrentChatStart, selectedUser._id]);

  return (
    <div className='chat-page'>
      <UserCard user={selectedUser} />
      {currentChatId && (
        <ChatSocket currentChatId={currentChatId} currentUser={currentUser} />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  selectedUser: selectSelectedUser,
  currentUser: selectCurrentUser,
  currentChatId: selectCurrentChatId
});

const mapDispatchToProps = dispatch => ({
  loadingCurrentChatStart: selectedUserId =>
    dispatch(loadingCurrentChatStart(selectedUserId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
