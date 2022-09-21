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
    history.push(Routes.Categorias.Create.path);
  };

  return (
    <Button hidden={!PermissionChecker(permissionsKeys.CATEGORIA_ADD)} type="button" onClick={onCreateClick}>
    <TranslatableText  entry={'Nuevo'} />
  </Button>
  );
};