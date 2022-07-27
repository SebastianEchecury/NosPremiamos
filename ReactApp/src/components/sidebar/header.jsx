import React from 'react';
import { Button, Image } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { TranslatableText } from './../translations';
import { useLogoutMutation } from '../../redux/apis/auth';

import ProfilePicture from '../../assets/images/profile-picture.png';
import { translationsGroupNames } from '../../utils/translationsGroupNames';

export default function Header() {
  const [logout] = useLogoutMutation();

  const clickHandler = () => {
    logout();
  };

  return (
    <>
      <div className="user-avatar lg-avatar me-4">
        <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
      </div>
      <div className="d-block">
        <Button as={Link} variant="secondary" size="xs" to="/" className="text-dark" onClick={clickHandler}>
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
          <TranslatableText group={translationsGroupNames.Generic} entry="Logout">Logout</TranslatableText>
        </Button>
      </div>
    </>
  );
};