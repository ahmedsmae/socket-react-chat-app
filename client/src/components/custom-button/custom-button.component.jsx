import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({
  children,
  icon,
  green,
  grey,
  red,
  small,
  ...otherProps
}) => (
  <button
    className={`custom-button ${icon && 'icon'} ${green && 'green'} ${grey &&
      'grey'} ${red && 'red'} ${small && 'small'}`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
