import React from 'react';
import { useSelector } from 'react-redux';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

import IconButton from '../../../components/icon-button';
import { Cell, Row as TecsoRow } from '../../../components/table';
import { useTranslations } from '../../../components/translations';
import { Routes } from '../../../routes';
import { permissionsKeys } from '../../../utils/permissionsKeys';
import PermissionChecker from '../../../components/permissionChecker';
import { translationsGroupNames } from '../../../utils/translationsGroupNames';

export default function Row({ value, index, values }) {
  const { translations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['Delete', 'Yes', 'No'] });

    return (
        <TecsoRow>
            <Cell>{value.numeroDesde}</Cell>
            <Cell>{value.numeroHasta}</Cell>
            <Cell>{value.ultimoNumero}</Cell>
            <Cell>{(value.completo) ? translations.Yes : translations.No}</Cell>
            <Cell>
            {PermissionChecker(permissionsKeys.TERMINALES_TALONARIO_VIEW) && <IconButton title={translations.View} icon={faEye} href={Routes.Terminales.Talonarios.View.path.replace(':id', value.id)} className="mx-1" />}
             <IconButton title={translations.View} icon={faEye} href={Routes.Terminales.Talonarios.View.path.replace(':id', value.id)} className="mx-1" />
            </Cell>
        </TecsoRow>
    );
}