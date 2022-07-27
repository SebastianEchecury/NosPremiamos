import React from 'react';
import { Nav, Navbar as BoostrapNavbar, Container } from '@themesberg/react-bootstrap';

import UserMenu from './user-menu';

export default function Navbar() {
  return (
    <BoostrapNavbar variant="dark" expanded className="ps-0 pe-2 pb-0 bg-white">
      <Container fluid className="px-0 d-flex justify-content-end">
        <Nav>
          <UserMenu />
        </Nav>
      </Container>
    </BoostrapNavbar>
  );
}