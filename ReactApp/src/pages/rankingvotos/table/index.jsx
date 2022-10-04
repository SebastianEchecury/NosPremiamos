import React from 'react';

import { Header, OptionMenu, SortDescription, SortForm, Table as TecsoTable, TextFilterDescription, TextFilterForm } from '../../../components/table';
import { TranslatableText } from '../../../components/translations';



import Row from './row';

export default function Table(props) { 

  return (
    <TecsoTable {...props} row={(props) => <Row {...props} />}>
      <Header className="d-flex" filter={{RankingVotos:true}}>
        <TranslatableText  entry="Categoria" />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ Categoria: value })} />
        <OptionMenu className="ms-auto">
          <TextFilterForm conditions={(value) => ({ Categoria: value })} />
        </OptionMenu>
      </Header>
      <Header  className="d-flex">
        <TranslatableText  entry="Ganador" />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ Ganador: value })} />
        <OptionMenu className="ms-auto">
          <TextFilterForm conditions={(value) => ({ Ganador: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText entry="Votos para el ganador" />
      </Header>  
      <Header className="d-flex">
        <TranslatableText entry="Total de votos" />
      </Header>   
    </TecsoTable>
  );
};