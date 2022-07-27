import React from 'react';
import { Image } from '@themesberg/react-bootstrap';

import Logo from '../../assets/images/logo.png';

export default () => {
  return (
    <Image src={Logo} className="navbar-brand-light" />
  );
};