import React from 'react';
import { Button } from '@themesberg/react-bootstrap';

import { useTranslations } from '../../components/translations';
import { Routes } from '../../routes';
import { useHistory } from 'react-router-dom';
import { permissionsKeys } from '../../utils/permissionsKeys';
import PermissionChecker from '../../components/permissionChecker';
import { translationsGroupNames } from '../../utils/translationsGroupNames';

export default function Header() {
  const { translations: genericTranslations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['Create'] });
  const { translations: rolesTranslations } = useTranslations({ group: translationsGroupNames.Roles, keys: ['Roles'] });
  const history = useHistory();

  const onCreateClick = () => {
    history.push(Routes.Roles.Create.path);
  };

  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
      <div className="d-block mb-4 mb-md-0">
        <h4>{rolesTranslations.Roles}</h4>
      </div>
      <div className="d-block mb-4 mb-md-0">
        <Button  hidden={!PermissionChecker(permissionsKeys.ROLE_ADD)} type="button" onClick={onCreateClick}>{genericTranslations.Create}</Button>
      </div>
    </div>
  );
};