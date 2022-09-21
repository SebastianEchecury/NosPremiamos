import React from 'react';
import { Button } from '@themesberg/react-bootstrap';

import { TranslatableText } from '../../components/translations';
import { Routes } from '../../routes';
import { useHistory } from 'react-router-dom';
import { permissionsKeys } from '../../utils/permissionsKeys';
import PermissionChecker from '../../components/permissionChecker';

export default function Header() {
  const history = useHistory();

  const onCreateClick = () => {
    history.push(Routes.Users.Create.path);
  };

  return (
    <Button hidden={!PermissionChecker(permissionsKeys.USER_ADD)} type="button" onClick={onCreateClick}>
    <TranslatableText  entry={'Nuevo'} />
  </Button>
  );
};