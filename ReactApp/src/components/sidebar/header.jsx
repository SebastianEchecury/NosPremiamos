import React from 'react';
import { Button, Image } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { TranslatableText } from './../translations';
import { useLogoutMutation } from '../../redux/apis/auth';

import ProfilePicture from '../../assets/images/profile-picture.png';
import { useHistory } from 'react-router-dom';

import { Routes } from "../../routes";

export default function Header() {
  const [logout] = useLogoutMutation();
  let history = useHistory();

  const clickHandler = () => {
    history.push(Routes.Signin.path);
  };

  return (
    <>
      <div className="user-avatar lg-avatar me-4">
        <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
      </div>
      <div className="d-block">
        <Button  variant="secondary" size="xs" to="/" className="text-dark" onClick={clickHandler}>
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
          <TranslatableText entry="Cerrar sesión"/>
        </Button>
      </div>
    </>
  );
};