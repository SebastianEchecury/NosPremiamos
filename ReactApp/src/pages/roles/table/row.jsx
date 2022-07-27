import React from 'react';
import { useSelector } from 'react-redux';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

import IconButton from '../../../components/icon-button';
import { Cell, Row as TecsoRow } from '../../../components/table';
import { TranslatableText, useTranslations } from '../../../components/translations';
import { Routes } from '../../../routes';
import { permissionsKeys } from '../../../utils/permissionsKeys';
import PermissionChecker from '../../../components/permissionChecker';
import { translationsGroupNames } from '../../../utils/translationsGroupNames';

export default function Row({ value, index, values }) {
  const { translations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['Edit', 'Delete', 'View'] });
  
  return (
    <TecsoRow>
      <Cell>{value.name}</Cell>
      <Cell>{value.description}</Cell>
      <Cell>{value.userRoles?.length}</Cell>
      <Cell>
        {(PermissionChecker(permissionsKeys.ROLE_VIEW)) && <IconButton title={translations.View} icon={faEye} href={Routes.Roles.View.path.replace(':id', value.id)} className="mx-1" />}
        {(PermissionChecker(permissionsKeys.ROLE_UPDATE) && !value.isSystem) && <IconButton title={translations.Edit} icon={faEdit} href={Routes.Roles.Update.path.replace(':id', value.id)} className="mx-1" />}
        {(PermissionChecker(permissionsKeys.ROLE_DELETE) && !value.isSystem) && <IconButton title={translations.Delete} icon={faTrash} href={Routes.Roles.Delete.path.replace(':id', value.id)} className="mx-1" />}
      </Cell>
    </TecsoRow>
  );
}