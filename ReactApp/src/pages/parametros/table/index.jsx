import React from 'react';

import { Header, OptionMenu, SelectFilterDescription, SelectFilterForm, SortDescription, SortForm, Table as TecsoTable, TextFilterDescription, TextFilterForm } from '../../../components/table';
import { TranslatableText } from '../../../components/translations';



import Row from './row';

export default function Table(props) { 

  return (
    <TecsoTable {...props} row={(props) => <Row {...props} />}>
      <Header className="d-flex">
        <TranslatableText  entry="Token" />
        <SortDescription className="ms-2" conditions={(order) => ({ Token: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ Token: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ Token: order })} />
          <TextFilterForm conditions={(value) => ({ Token: value })} />
        </OptionMenu>
      </Header>
      <Header  className="d-flex">
        <TranslatableText  entry="Descripción" />
        <SortDescription className="ms-2" conditions={(order) => ({ Descripcion: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ Descripcion: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ Descripcion: order })} />
          <TextFilterForm conditions={(value) => ({ Descripcion: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText entry="Valor" />
        <SortDescription className="ms-2" conditions={(order) => ({ Valor: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ Valor: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ Valor: order })} />
          <TextFilterForm conditions={(value) => ({ Valor: value })} />
        </OptionMenu>
      </Header>     
      <Header className="d-flex">
        <TranslatableText  entry="Accion" />
      </Header>
    </TecsoTable>
  );
};