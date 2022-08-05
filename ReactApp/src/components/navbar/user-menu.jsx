import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Nav, Image, Navbar as BoostrapNavbar, Dropdown, Container } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslatableText } from '../translations';
import { useHistory } from 'react-router-dom';
import { Routes } from "../../routes";
import './user-menu.scss';

export default function UserMenu() {
  const token = useSelector((state) => state.auth.token);
  let history = useHistory();  
  const firstName = useRef(localStorage.getItem('usuario')? JSON.parse(localStorage.getItem('usuario')).nombre : '');
  const lastName = useRef(localStorage.getItem('usuario')? JSON.parse(localStorage.getItem('usuario')).apellido : '');

  useEffect(() => {
    if (token) {
    }
  }, [token]);

  const clickHandler = () => {
    history.push(Routes.Signin.path);
  };

  return (
    <Dropdown as={Nav.Item}>
      <Dropdown.Toggle as={Nav.Link}>
        <div className="user-menu-icon">
          <h5 className="user-menu-name p-0">{`${(firstName.current)[0]}${(lastName.current)[0]}`}</h5>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
        <Dropdown.Item className="fw-bold" onClick={clickHandler}>
          <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" />
          <TranslatableText  entry="Cerrar sesión"/>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}