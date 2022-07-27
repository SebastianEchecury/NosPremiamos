import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import IconButton from '../../../components/icon-button';
import { Cell, Row as TecsoRow } from '../../../components/table';
import { useTranslations } from '../../../components/translations';
import { Routes } from '../../../routes';
import { permissionsKeys } from '../../../utils/permissionsKeys';
import PermissionChecker from '../../../components/permissionChecker';
import { translationsGroupNames } from '../../../utils/translationsGroupNames';

export default function Row({ value, index, values }) {
  const { translations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['Delete'] });

  return (
    <TecsoRow>
      <Cell>{value.patente}</Cell>
      <Cell>
        {(PermissionChecker(permissionsKeys.REPRESENTANTE_PATENTE_DELETE)) && <IconButton title={translations.Delete} icon={faTrash} href={Routes.GestionarPatentes.Delete.path.replace(':id', value.id)} className="mx-1" />}
      </Cell>
    </TecsoRow>
  );
}