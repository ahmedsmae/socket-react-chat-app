import React from 'react';

import DefaultUser from '../../assets/user.png';

import './user-image.styles.scss';

const UserImage = ({ src, icon, ...otherProps }) => {
  return (
    <div className='image-container' {...otherProps}>
      <img
        className={`user-image ${icon && 'icon'}`}
        src={src ? src : DefaultUser}
        alt='User'
      />
    </div>
  );
};

export default UserImage;
