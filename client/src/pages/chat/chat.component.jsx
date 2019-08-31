import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadingCurrentChatStart } from '../../redux/current-chat/current-chat.actions';

import { selectSelectedUser } from '../../redux/users-list/users-list.selectors';
import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { selectCurrentChatId } from '../../redux/current-chat/current-chat.selectors';

import UserCard from '../../components/user-card/user-card.component';
import ChatSocket from '../../components/chat-socket/chat-socket.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import './chat.styles.scss';

const ChatSocketWithSpinner = WithSpinner(ChatSocket);

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
    <Fragment className='chat-page'>
      <div className='user-card-container'>
        <UserCard user={selectedUser} />
      </div>
      <ChatSocketWithSpinner
        isLoading={currentChatId.length ? false : true}
        currentChatId={currentChatId}
        currentUser={currentUser}
      />
    </Fragment>
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
