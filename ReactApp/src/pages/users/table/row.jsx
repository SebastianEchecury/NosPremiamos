import React from 'react';
import { Badge } from '@themesberg/react-bootstrap';
import { faCheck, faEdit,  faTrash } from '@fortawesome/free-solid-svg-icons';

import IconButton from '../../../components/icon-button';
import { Cell, Row as TecsoRow } from '../../../components/table';
import { TranslatableText } from '../../../components/translations';
import { Routes } from '../../../routes';
import { permissionsKeys } from '../../../utils/permissionsKeys';
import PermissionChecker from '../../../components/permissionChecker';

export default function Row({ value, index, values }) {

  return (
    <TecsoRow>
      <Cell>{value.Usuario}</Cell>
      <Cell>{value.Nombre}</Cell>
      <Cell>{value.Apellido}</Cell>
      {!value.Eliminado && <Cell><Badge bg="secondary"><TranslatableText  entry="Activo" /></Badge></Cell>}
      {value.Eliminado && <Cell><Badge bg="typography-light-mode-tertiary"><TranslatableText  entry="Inactivo" /></Badge></Cell>}
      <Cell>        
        {PermissionChecker(permissionsKeys.USER_UPDATE) && !(value.Usuario == 'admin@admin.com') && <IconButton title='Editar' icon={faEdit} href={Routes.Users.Update.path.replace(':Id', value.Id)} className="mx-1" />}
        {PermissionChecker(permissionsKeys.USER_DELETE) && !(value.Usuario == 'admin@admin.com') && !value.Eliminado && <IconButton title='Eliminar' icon={faTrash} href={Routes.Users.Delete.path.replace(':Id', value.Id)} className="mx-1" />}
        {PermissionChecker(permissionsKeys.USER_DELETE) && !(value.Usuario == 'admin@admin.com') && value.Eliminado && <IconButton title='Re-Activar' icon={faCheck} href={Routes.Users.Delete.path.replace(':Id', value.Id)} className="mx-1" />}
      </Cell>
    </TecsoRow>
  );
}