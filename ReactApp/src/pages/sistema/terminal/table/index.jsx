import React from 'react'

import { Header, OptionMenu, SortDescription, SortForm, Table as TecsoTable, TextFilterDescription, TextFilterForm } from '../../../../components/table';
import { TranslatableText } from '../../../../components/translations';
import { translationsGroupNames } from '../../../../utils/translationsGroupNames';

import Row from './row';

export default function Table(props) {
  return (
    <TecsoTable {...props} row={(props) => <Row {...props} />}>
      <Header order={[{ nombre: 'asc' }]} className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="FirstName" />
        <SortDescription className="ms-2" conditions={(order) => ({ nombre: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ nombre: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ nombre: order })} />
          <TextFilterForm conditions={(value) => ({ nombre: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Terminales} entry="Cuit" />
        <SortDescription className="ms-2" conditions={(order) => ({ cuit: order })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ cuit: order })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Terminales} entry="NumeroDePlanta" />
        <SortDescription className="ms-2" conditions={(order) => ({ nroPlanta: order })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ nroPlanta: order })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Terminales} entry="UsuariosAsignados" />
        <SortDescription className="ms-2" conditions={(order) => ({ usuariosAsignados: order })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ usuariosAsignados: order })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="Actions" />
      </Header>
    </TecsoTable>
  );
}
