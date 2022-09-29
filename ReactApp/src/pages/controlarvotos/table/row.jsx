import React from 'react';
import { Badge } from 'react-bootstrap';
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
      <Cell>{value.VotadoEmpleado.Description}</Cell>
      <Cell>{value.VotanteEmpleado.Description}</Cell>
      <Cell>{value.Categoria.Nombre}</Cell>
      <Cell>{value.Motivo}</Cell>
      <Cell>        
        {PermissionChecker(permissionsKeys.VOTO_UPDATE) && !value.Eliminado && <IconButton title='Aprobar' icon={faTrash} href={Routes.Users.Delete.path.replace(':Id', value.Id)} className="mx-1" />}
        {PermissionChecker(permissionsKeys.VOTO_UPDATE)  && value.Eliminado && <IconButton title='Rechazar' icon={faCheck} href={Routes.Users.Delete.path.replace(':Id', value.Id)} className="mx-1" />}
      </Cell>
    </TecsoRow>
  );
}