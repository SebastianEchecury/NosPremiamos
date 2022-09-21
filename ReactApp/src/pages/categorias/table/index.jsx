import React from 'react';

import { Header, OptionMenu, SelectFilterDescription, SelectFilterForm, SortDescription, SortForm, Table as TecsoTable, TextFilterDescription, TextFilterForm } from '../../../components/table';
import { TranslatableText } from '../../../components/translations';



import Row from './row';

export default function Table(props) {

  const statuses = [
    { description: 'Todos' },
    { value: 'true', description: 'Si' },
    { value: 'false', description: 'No' }
  ]; 

  const estado = [
    { description: 'Todos' },
    { value: 'true', description: 'Activa' },
    { value: 'false', description: 'Inactiva' }
  ]; 

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
        <TranslatableText entry="Descripcion" />
        <SortDescription className="ms-2" conditions={(order) => ({ Descripcion: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ Descripcion: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ Descripcion: order })} />
          <TextFilterForm conditions={(value) => ({ Descripcion: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText entry="Cantidad de Votos" />
        <SortDescription className="ms-2" conditions={(order) => ({ CantidadVotos: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ CantidadVotos: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ CantidadVotos: order })} />
          <TextFilterForm conditions={(value) => ({ CantidadVotos: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText  entry="Incluye Novedades" />
        <SelectFilterDescription className="ms-2" conditions={(value) => ({ IncluyeNovedades: value })} options={statuses} />
        <OptionMenu className="ms-auto">
          <SelectFilterForm conditions={(value) => ({ IncluyeNovedades: value })} options={statuses} />
        </OptionMenu>
      </Header> 
      <Header className="d-flex">
        <TranslatableText  entry="Requiere Aprobación" />
        <SelectFilterDescription className="ms-2" conditions={(value) => ({ RequiereAprobacion: value })} options={statuses} />
        <OptionMenu className="ms-auto">
          <SelectFilterForm conditions={(value) => ({ RequiereAproBacion: value })} options={statuses} />
        </OptionMenu>
      </Header> 
      <Header className="d-flex">
        <TranslatableText  entry="Estado" />
        <SelectFilterDescription className="ms-2" conditions={(value) => ({ EstadoId: value })} options={estado} />
        <OptionMenu className="ms-auto">
          <SelectFilterForm conditions={(value) => ({ EstadoId: value })} options={estado} />
        </OptionMenu>
      </Header> 
      <Header className="d-flex">
        <TranslatableText  entry="Accion" />
      </Header>
    </TecsoTable>
  );
};