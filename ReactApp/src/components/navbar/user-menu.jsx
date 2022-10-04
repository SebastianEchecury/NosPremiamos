import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { TranslatableText } from '../translations';
import { useHistory } from 'react-router-dom';
import { useGetHeaderQuery } from '../../redux/apis/users';
import { Routes } from '../../routes';

import UserMenuToggle from './user-menu-toogle';

export default function UserMenu() {
  const { refetch } = useGetHeaderQuery();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token]);
  let history = useHistory();
  const clickHandler = () => {
    history.push(Routes.Signin.path);
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle as={UserMenuToggle} />
      <Dropdown.Menu>
        <Dropdown.Item onClick={clickHandler}>
          <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" />
          <TranslatableText  entry="Cerrar Sesion"></TranslatableText>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}