import React, { forwardRef, useRef } from 'react';

import './user-avatar.scss';

export default forwardRef(({ className, ...props }, ref) => {
  const firstName = useRef(localStorage.getItem('usuario')? JSON.parse(localStorage.getItem('usuario')).nombre : '');
  const lastName = useRef(localStorage.getItem('usuario')? JSON.parse(localStorage.getItem('usuario')).apellido : '');

  return (
    <div ref={ref} className={`user-avatar text-center ${className}`} {...props}>
      <h6 className="m-0">{`${(firstName.current)[0]}${(lastName.current)[0]}`}</h6>
    </div>
  );
});