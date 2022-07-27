import React from 'react';
import { Badge } from '@themesberg/react-bootstrap';
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
      <Cell>{value.email}</Cell>
      <Cell>{value.firstName}</Cell>
      <Cell>{value.lastName}</Cell>
      {value.isActive && <Cell><Badge bg="secondary"><TranslatableText group={translationsGroupNames.Generic} entry="Active" /></Badge></Cell>}
      {!value.isActive && <Cell><Badge bg="typography-light-mode-tertiary"><TranslatableText group={translationsGroupNames.Generic} entry="Inactive" /></Badge></Cell>}
      <Cell>{value.userType?.name}</Cell>
      <Cell>{value.terminal?.nombre}</Cell>
      <Cell>
        {PermissionChecker(permissionsKeys.USER_VIEW) && <IconButton title={translations.View} icon={faEye} href={Routes.Users.View.path.replace(':id', value.id)} className="mx-1" />}
        {PermissionChecker(permissionsKeys.USER_UPDATE) && !value.isSystem && <IconButton title={translations.Edit} icon={faEdit} href={Routes.Users.Update.path.replace(':id', value.id)} className="mx-1" />}
        {PermissionChecker(permissionsKeys.USER_DELETE) && !value.isSystem && <IconButton title={translations.Delete} icon={faTrash} href={Routes.Users.Delete.path.replace(':id', value.id)} className="mx-1" />}
      </Cell>
    </TecsoRow>
  );
}