import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Nav, Image, Navbar as BoostrapNavbar, Dropdown, Container } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { TranslatableText } from '../translations';

import { useLogoutMutation } from '../../redux/apis/auth';
import { useGetHeaderQuery } from '../../redux/apis/users';
import { translationsGroupNames } from '../../utils/translationsGroupNames';

import './user-menu.scss';

export default function UserMenu() {
  const { data: header, refetch } = useGetHeaderQuery();
  const [logout] = useLogoutMutation();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token]);

  const clickHandler = () => {
    logout();
  };

  return (
    <Dropdown as={Nav.Item}>
      <Dropdown.Toggle as={Nav.Link}>
        <div className="user-menu-icon">
          <h5 className="user-menu-name p-0">{`${(header?.firstName || '')[0]}${(header?.lastName || '')[0]}`}</h5>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
        <Dropdown.Item className="fw-bold" onClick={clickHandler}>
          <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" />
          <TranslatableText group={translationsGroupNames.Generic} entry="Logout">Logout</TranslatableText>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}