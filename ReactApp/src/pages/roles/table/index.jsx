import React from 'react';

import { Header, OptionMenu, SortDescription, SortForm, Table as TecsoTable, TextFilterDescription, TextFilterForm } from '../../../components/table';
import { TranslatableText } from '../../../components/translations';
import { translationsGroupNames } from '../../../utils/translationsGroupNames';

import Row from './row';

export default function Table(props) {
  return (
    <TecsoTable {...props} row={(props) => <Row {...props} />}>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="Name" />
        <SortDescription className="ms-2" conditions={(order) => ({ name: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ name: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ name: order })} />
          <TextFilterForm conditions={(value) => ({ name: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="Description" />
        <SortDescription className="ms-2" conditions={(order) => ({ description: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ description: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ description: order })} />
          <TextFilterForm conditions={(value) => ({ description: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="UsuariosAsignados" />
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="Actions" />
      </Header>
    </TecsoTable>
  );
};