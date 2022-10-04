import React from 'react';

import { Header, OptionMenu, Table as TecsoTable, TextFilterDescription, TextFilterForm } from '../../../components/table';
import { TranslatableText } from '../../../components/translations';



import Row from './row';

export default function Table(props) { 
    const Id = JSON.parse(localStorage.getItem('usuario')).id

  return (
    <TecsoTable {...props} row={(props) => <Row {...props} />}>
      <Header className="d-flex" filter={{VotosEmitidos:true, UsuarioId:Id}}>
        <TranslatableText  entry="Voté a" />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ Votado: value })} />
        <OptionMenu className="ms-auto">
          <TextFilterForm conditions={(value) => ({ Votado: value })} />
        </OptionMenu>
      </Header>
      <Header  className="d-flex">
        <TranslatableText  entry="Aprobador" />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ Aprobador: value })} />
        <OptionMenu className="ms-auto">
          <TextFilterForm conditions={(value) => ({ Aprobador: value })} />
        </OptionMenu>
      </Header>
      <Header  className="d-flex">
        <TranslatableText  entry="Categoría" />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ NombreCategoria: value })} />
        <OptionMenu className="ms-auto">
          <TextFilterForm conditions={(value) => ({ NombreCategoria: value })} />
        </OptionMenu>
      </Header> 
      <Header  className="d-flex">
        <TranslatableText  entry="Motivo" />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ Motivo: value })} />
        <OptionMenu className="ms-auto">
          <TextFilterForm conditions={(value) => ({ Motivo: value })} />
        </OptionMenu>
      </Header> 
      <Header  className="d-flex">
        <TranslatableText  entry="Fecha del voto" />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ FechaVoto: value })} />
        <OptionMenu className="ms-auto">
          <TextFilterForm conditions={(value) => ({ FechaVoto: value })} />
        </OptionMenu>
      </Header> 
    </TecsoTable>
  );
};