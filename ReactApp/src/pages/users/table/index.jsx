import React from 'react';

import { Header, OptionMenu, SelectFilterDescription, SelectFilterForm, SortDescription, SortForm, Table as TecsoTable, TextFilterDescription, TextFilterForm } from '../../../components/table';
import { TranslatableText } from '../../../components/translations';



import Row from './row';

export default function Table(props) {

  const statuses = [
    { description: 'Todos' },
    { value: 'true', description: 'Activo' },
    { value: 'false', description: 'Inactivo' }
  ]; 

  return (
    <TecsoTable {...props} row={(props) => <Row {...props} />}>
      <Header className="d-flex">
        <TranslatableText  entry="Email" />
        <SortDescription className="ms-2" conditions={(order) => ({ Usuario: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ Usuario: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ Usuario: order })} />
          <TextFilterForm conditions={(value) => ({ Usuario: value })} />
        </OptionMenu>
      </Header>
      <Header  className="d-flex">
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
      <Header className="d-flex">
        <TranslatableText  entry="Estado" />
        <SelectFilterDescription className="ms-2" conditions={(value) => ({ Eliminado: value })} options={statuses} />
        <OptionMenu className="ms-auto">
          <SelectFilterForm conditions={(value) => ({ Eliminado: value })} options={statuses} />
        </OptionMenu>
      </Header> 
      <Header className="d-flex">
        <TranslatableText  entry="Accion" />
      </Header>
    </TecsoTable>
  );
};