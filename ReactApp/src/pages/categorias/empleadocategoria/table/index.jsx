import React from 'react';

import { Header, OptionMenu, SortDescription, SortForm, Table as TecsoTable, TextFilterDescription, TextFilterForm } from '../../../../components/table';
import { TranslatableText } from '../../../../components/translations';

import Row from './row';

export default function Table(props) { 

  return (
    <TecsoTable {...props} row={(props) => <Row {...props} />}>
      <Header order={[{ name: 'asc' }]} className="d-flex">
        <TranslatableText  entry="Nombre" />
        <SortDescription className="ms-2" conditions={(order) => ({ Nombre: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ Nombre: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ Nombre: order })} />
          <TextFilterForm conditions={(value) => ({ Nombre: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText entry="Apellido" />
        <SortDescription className="ms-2" conditions={(order) => ({ Apellido: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ Apellido: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ Apellido: order })} />
          <TextFilterForm conditions={(value) => ({ Apellido: value })} />
        </OptionMenu>
      </Header>     
    </TecsoTable>
  );
};