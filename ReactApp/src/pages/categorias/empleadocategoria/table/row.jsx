import React from 'react';
import { Cell, Row as TecsoRow } from '../../../../components/table';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../../../components/icon-button';
import { Routes } from '../../../../routes';
import { permissionsKeys } from '../../../../utils/permissionsKeys';
import PermissionChecker from '../../../../components/permissionChecker';

export default function Row({ value, index, values }) {

  return (
    <TecsoRow>
      <Cell>{value.Empleado.Nombre}</Cell>
      <Cell>{value.Empleado.Apellido}</Cell>
      <Cell>             
        {PermissionChecker(permissionsKeys.CATEGORIA_DELETE) && !(value.Usuario == 'admin@admin.com') && !value.Eliminado && <IconButton title='Eliminar' icon={faTrash}  href={Routes.EmpleadosCategoriasAprobador.Delete.path.replace(':Id', value.Id)} className="mx-1" />}
      </Cell>
    </TecsoRow>
  );
}