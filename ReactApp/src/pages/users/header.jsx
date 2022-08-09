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
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
      <div className="d-block mb-4 mb-md-0">
        <h4>
          <TranslatableText  entry={'Empleados'} />
        </h4>
      </div>
      <div className="d-block mb-4 mb-md-0">
        <Button hidden={!PermissionChecker(permissionsKeys.USER_ADD)} type="button" onClick={onCreateClick}>
          <TranslatableText  entry={'Nuevo'} />
        </Button>
      </div>
    </div>
  );
};