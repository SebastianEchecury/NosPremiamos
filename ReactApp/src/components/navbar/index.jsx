import React, {useRef} from 'react';
import { Navbar as BoostrapNavbar } from 'react-bootstrap';

import AppSidebar from '../sidebar';
import { TranslatableText } from '../translations';
import UserAvatar from '../user-avatar';

import UserMenu from './user-menu';

export default function Navbar() {
  const firstName = useRef(localStorage.getItem('usuario')? JSON.parse(localStorage.getItem('usuario')).nombre : '');
  const lastName = useRef(localStorage.getItem('usuario')? JSON.parse(localStorage.getItem('usuario')).apellido : '');

  return (
    <>
      <BoostrapNavbar expand="lg" className="d-none d-lg-flex">
        <div className="flex-fill"></div>
        <UserMenu />
      </BoostrapNavbar>
      <BoostrapNavbar expand="lg" className="d-lg-none">
        <BoostrapNavbar.Brand className="d-flex align-items-center">
          <UserAvatar className="me-2 bg-secondary" />
          <TranslatableText  entry="Hola" />
          <span className="ms-1 text-capitalize">{`${(firstName.current)[0]}${(lastName.current)[0]}`}</span>!
        </BoostrapNavbar.Brand>
        <BoostrapNavbar.Toggle />
        <BoostrapNavbar.Collapse>
          <AppSidebar />
        </BoostrapNavbar.Collapse>
      </BoostrapNavbar>
    </>
  );
}