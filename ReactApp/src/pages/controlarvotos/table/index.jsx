import React from 'react';

import { Header, OptionMenu, SortDescription, SortForm, Table as TecsoTable, TextFilterDescription, TextFilterForm } from '../../../components/table';
import { TranslatableText } from '../../../components/translations';



import Row from './row';

export default function Table(props) { 
const Id = JSON.parse(localStorage.getItem('usuario')).id
  return (
    <TecsoTable {...props} row={(props) => <Row {...props} />}>         
      <Header className="d-flex" filter={{CategoriaRequiereAprobacion:true, EmpleadoAprobador:Id}}>
        <TranslatableText  entry="Voto a" />
        <SortDescription className="ms-2" conditions={(order) => ({ VotadoEmpleado: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ VotadoEmpleado: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ VotadoEmpleado: order })} />
          <TextFilterForm conditions={(value) => ({ VotadoEmpleado: value })} />
        </OptionMenu>
      </Header>
      <Header  className="d-flex">
        <TranslatableText  entry="Votante" />
        <SortDescription className="ms-2" conditions={(order) => ({ VotanteEmpleado: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ VotanteEmpleado: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ VotanteEmpleado: order })} />
          <TextFilterForm conditions={(value) => ({ VotanteEmpleado: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText entry="Categoria" />
        <SortDescription className="ms-2" conditions={(order) => ({ Categoria: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ Categoria: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ Categoria: order })} />
          <TextFilterForm conditions={(value) => ({ Categoria: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText entry="Motivo" />
        <SortDescription className="ms-2" conditions={(order) => ({ Motivo: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ Motivo: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ Motivo: order })} />
          <TextFilterForm conditions={(value) => ({ Motivo: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText  entry="Accion" />
      </Header>
    </TecsoTable>
  );
};