import React from 'react';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

import IconButton from '../../../../components/icon-button';
import { Cell, Row as TecsoRow } from '../../../../components/table';
import { useTranslations } from '../../../../components/translations';
import { Routes } from '../../../../routes';
import { permissionsKeys } from '../../../../utils/permissionsKeys';
import PermissionChecker from '../../../../components/permissionChecker';
import { translationsGroupNames } from '../../../../utils/translationsGroupNames';

import { useGetListQuery } from '../../../../redux/apis/users';


export default function Row({ value, index, values }) {
  const { translations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['Edit', 'Delete', 'View'] });

  const { data = [] } = useGetListQuery({ filter: { terminalId: value.id } });

  return (
    <TecsoRow>
      <Cell>{value.nombre}</Cell>
      <Cell>{value.cuit}</Cell>
      <Cell>{value.nroPlanta}</Cell>
      <Cell>{data.length}</Cell>
      <Cell>
        {PermissionChecker(permissionsKeys.CONFIGURACION_TERMINAL_ADMINISTRAR) && <IconButton title={translations.View} icon={faEye} href={Routes.Terminales.View.path.replace(':id', value.id)} className="mx-1" />}
        {PermissionChecker(permissionsKeys.CONFIGURACION_TERMINAL_ADMINISTRAR) && !value.isSystem && <IconButton title={translations.Edit} icon={faEdit} href={Routes.Terminales.Update.path.replace(':id', value.id)} className="mx-1" />}
        {PermissionChecker(permissionsKeys.CONFIGURACION_TERMINAL_ADMINISTRAR) && !value.isSystem && <IconButton title={translations.Delete} icon={faTrash} href={Routes.Terminales.Delete.path.replace(':id', value.id)} className="mx-1" />}
      </Cell>
    </TecsoRow>
  );
}