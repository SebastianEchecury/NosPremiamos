import React from 'react';
import { Header, OptionMenu, SortDescription, SortForm, Table as TecsoTable, TextFilterDescription, TextFilterForm } from '../../../../../components/table';
import { TranslatableText } from '../../../../../components/translations';
import { translationsGroupNames } from '../../../../../utils/translationsGroupNames';
import Row from './row';

export default function Table(props) {

  return (
    <TecsoTable {...props} row={(props) => <Row {...props} />}>
      <Header order={[{ numero: 'asc' }]} className="d-flex">
        <TranslatableText group={translationsGroupNames.Terminales} entry="NumeroTicket" />
        <SortDescription className="ms-2" conditions={(order) => ({ numero: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ numero: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ numero: order })} />
          <TextFilterForm conditions={(value) => ({ numero: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Terminales} entry="Efectivo" />
        <SortDescription className="ms-2" conditions={(order) => ({ efectivo: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ efectivo: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ efectivo: order })} />
          <TextFilterForm conditions={(value) => ({ efectivo: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="EstadoTicket" />
        <SortDescription className="ms-2" conditions={(order) => ({ estadoTicketId: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ estadoTicketId: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ estadoTicketId: order })} />
          <TextFilterForm conditions={(value) => ({ estadoTicketId: value })} />
        </OptionMenu>
      </Header>      
    </TecsoTable>
  );
};