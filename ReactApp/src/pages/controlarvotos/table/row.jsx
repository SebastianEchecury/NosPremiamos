import React from 'react';
import { Badge } from 'react-bootstrap';
import { faCheck, faEdit,  faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';

import IconButton from '../../../components/icon-button';
import { Cell, Row as TecsoRow } from '../../../components/table';
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
        {PermissionChecker(permissionsKeys.VOTO_UPDATE)  && <IconButton title='Aprobar' icon={faCheck} href={Routes.Controlarvotos.Update.path.replace(':Id', value.Id)} className="mx-1" />}
        {PermissionChecker(permissionsKeys.VOTO_UPDATE)  && <IconButton title='Rechazar' icon={faXmark} href={Routes.Controlarvotos.Delete.path.replace(':Id', value.Id)} className="mx-1" />}
      </Cell>
    </TecsoRow>
  );
}