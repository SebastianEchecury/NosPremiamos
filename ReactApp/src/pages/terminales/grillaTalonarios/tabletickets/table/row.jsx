import React from 'react';
import { Cell, Row as TecsoRow } from '../../../../../components/table';

import { useTranslations } from '../../../../../components/translations';
import { translationsGroupNames } from '../../../../../utils/translationsGroupNames';


export default function Row({ value, index, values }) {
    const { translations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['Yes', 'No'] });

  return (
    <TecsoRow>
      <Cell>{value.numero}</Cell>
      <Cell>{(value.efectivo) ? translations.Yes : translations.No}</Cell>
      <Cell>{value.estadoTicket.nombre}</Cell>
    </TecsoRow>
  );
}