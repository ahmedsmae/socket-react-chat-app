import React from 'react';

import UserImage from '../user-image/user-image.component';

import './user-card.styles.scss';

const UserCard = ({ user, ...otherProps }) => {
  return (
    <div className='user-card' {...otherProps}>
      <UserImage icon src={user.avatar} />
      <div className='user-info'>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
