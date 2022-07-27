import React from 'react'

import { Header, OptionMenu, SortDescription, SortForm, Table as TecsoTable, TextFilterDescription, TextFilterForm } from '../../../components/table';
import { TranslatableText } from '../../../components/translations';
import { translationsGroupNames } from '../../../utils/translationsGroupNames';

import Row from './row';

export default function Table(props) {
  return (
    <TecsoTable {...props} row={(props) => <Row {...props} />}>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="NumeroDesde" />
        <SortDescription className="ms-2" conditions={(order) => ({ numeroDesde: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ numeroDesde: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ numeroDesde: order })} />
          <TextFilterForm conditions={(value) => ({ numeroDesde: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="NumeroHasta" />
        <SortDescription className="ms-2" conditions={(order) => ({ numeroHasta: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ numeroHasta: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ numeroHasta: order })} />
          <TextFilterForm conditions={(value) => ({ numeroHasta: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Terminales} entry="UltimoNumero" />
        <SortDescription className="ms-2" conditions={(order) => ({ ultimoNumero: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ ultimoNumero: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ ultimoNumero: order })} />
          <TextFilterForm conditions={(value) => ({ ultimoNumero: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Terminales} entry="Completo" />
        <SortDescription className="ms-2" conditions={(order) => ({ completo: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ completo: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ completo: order })} />
          <TextFilterForm conditions={(value) => ({ completo: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="Actions" />
      </Header>
    </TecsoTable>
  );
}
