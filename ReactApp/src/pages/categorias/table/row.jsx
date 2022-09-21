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
      <Cell>{value.Nombre}</Cell>
      <Cell >{value.Descripcion}</Cell>
      <Cell>{value.CantidadVotos}</Cell>
      {value.IncluyeNovedades && <Cell><TranslatableText  entry="Si" /></Cell>}
      {!value.IncluyeNovedades && <Cell><TranslatableText  entry="No" /></Cell>}
      {value.RequiereAprobacion && <Cell><TranslatableText  entry="Si" /></Cell>}
      {!value.RequiereAprobacion && <Cell><TranslatableText  entry="No" /></Cell>}
      {value.EstadoId == 1 && <Cell><Badge bg="secondary"><TranslatableText  entry="Activa" /></Badge></Cell>}
      {value.EstadoId == 2 && <Cell><Badge bg="primary-active"><TranslatableText  entry="Inactiva" /></Badge></Cell>}
      <Cell>        
        {PermissionChecker(permissionsKeys.CATEGORIA_UPDATE) && !(value.Usuario == 'admin@admin.com') && <IconButton title='Editar' icon={faEdit} href={Routes.Categorias.Update.path.replace(':Id', value.Id)} className="mx-1" />}
        {PermissionChecker(permissionsKeys.CATEGORIA_DELETE) && !(value.Usuario == 'admin@admin.com') && !value.Eliminado && <IconButton title='Eliminar' icon={faTrash} href={Routes.Categorias.Delete.path.replace(':Id', value.Id)} className="mx-1" />}
        {PermissionChecker(permissionsKeys.CATEGORIA_DELETE) && !(value.Usuario == 'admin@admin.com') && value.Eliminado && <IconButton title='Re-Activar' icon={faCheck}  href={Routes.Categorias.Delete.path.replace(':Id', value.Id)} className="mx-1" />}
      </Cell>
    </TecsoRow>
  );
}