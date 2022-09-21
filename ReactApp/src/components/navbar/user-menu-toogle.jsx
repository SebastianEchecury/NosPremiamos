import React, { forwardRef } from 'react';

import UserAvatar from '../user-avatar';

import './user-menu-toogle.scss';

export default forwardRef(({ onClick }, ref) => {
  const clickHandler = (event) => {
    event.preventDefault();
    onClick(event);
  };

  return (
    <UserAvatar ref={ref} className="bg-secondary user-avatar-toogle" onClick={clickHandler} />
  );
});