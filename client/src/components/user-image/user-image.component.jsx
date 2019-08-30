import React from 'react';

import { ReactComponent as NoUser } from '../../assets/user.png';

import './user-image.styles.scss';

const UserImage = ({ src }) => {
  return (
    <div className='image-container'>
      <img className='user-image' src={!src ? NoUser : src} alt='User image' />
    </div>
  );
};

export default UserImage;
