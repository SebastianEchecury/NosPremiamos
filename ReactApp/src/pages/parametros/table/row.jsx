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
      <Cell>{value.Token}</Cell>
      <Cell>{value.Descripcion}</Cell>
      <Cell>{value.Valor}</Cell>
      <Cell>        
        {PermissionChecker(permissionsKeys.PARAMETRO_UPDATE) && !(value.Usuario == 'admin@admin.com') && <IconButton title='Editar' icon={faEdit} href={Routes.Parametros.Update.path.replace(':Id', value.Id)} className="mx-1" />}
        
      </Cell>
    </TecsoRow>
  );
}