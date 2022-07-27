import React from 'react'

import { Header, OptionMenu, SortDescription, SortForm, Table as TecsoTable, TextFilterDescription, TextFilterForm } from '../../../components/table';
import { TranslatableText } from '../../../components/translations';
import { translationsGroupNames } from '../../../utils/translationsGroupNames';

import Row from './row';

export default function Table(props) {
  return (
    <TecsoTable {...props} row={(props) => <Row {...props} />}>
      <Header order={[{ patente: 'asc' }]} className="d-flex">
        <TranslatableText group={translationsGroupNames.Representantes} entry="Patentes" />
        <SortDescription className="ms-2" conditions={(order) => ({ patente: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ patente: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ patente: order })} />
          <TextFilterForm conditions={(value) => ({ patente: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="Actions" />
      </Header>
    </TecsoTable>
  );
}
