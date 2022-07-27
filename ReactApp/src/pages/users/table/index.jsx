import React from 'react';

import { Header, OptionMenu, SelectFilterDescription, SelectFilterForm, SortDescription, SortForm, Table as TecsoTable, TextFilterDescription, TextFilterForm } from '../../../components/table';
import { TranslatableText, useTranslations } from '../../../components/translations';

import { useGetItemsQuery as getTerminalesItemsQuery } from '../../../redux/apis/terminales';
import { useGetItemsQuery as useGetUserTypesItemsQuery } from '../../../redux/apis/user-types';

import { translationsGroupNames } from '../../../utils/translationsGroupNames';

import Row from './row';

export default function Table(props) {
  const { translations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['All', 'Active', 'Configuration', 'Inactive'] });
  const { data: terminalesItems = [] } = getTerminalesItemsQuery();
  const { data: userTypesItems = [] } = useGetUserTypesItemsQuery();

  const statuses = [
    { description: translations.All },
    { value: 'true', description: translations.Active },
    { value: 'false', description: translations.Inactive }
  ];
  const userTypes = [
    { description: translations.All },
    ...userTypesItems.map((type) => ({ value: `${type.id}`, description: type.description }))
  ];
  const terminales = [
    { value: null, description: translations.All },
    ...terminalesItems.map((terminal) => ({ value: `${terminal.id}`, description: terminal.description }))
  ];

  return (
    <TecsoTable {...props} row={(props) => <Row {...props} />}>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="Email" />
        <SortDescription className="ms-2" conditions={(order) => ({ email: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ email: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ email: order })} />
          <TextFilterForm conditions={(value) => ({ email: value })} />
        </OptionMenu>
      </Header>
      <Header order={[{ name: 'asc' }]} className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="FirstName" />
        <SortDescription className="ms-2" conditions={(order) => ({ name: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ firstName: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ name: order })} />
          <TextFilterForm conditions={(value) => ({ firstName: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="LastName" />
        <SortDescription className="ms-2" conditions={(order) => ({ lastName: order })} />
        <TextFilterDescription className="ms-2" conditions={(value) => ({ lastName: value })} />
        <OptionMenu className="ms-auto">
          <SortForm conditions={(order) => ({ lastName: order })} />
          <TextFilterForm conditions={(value) => ({ lastName: value })} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="Status" />
        <SelectFilterDescription className="ms-2" conditions={(value) => ({ isActive: value })} options={statuses} />
        <OptionMenu className="ms-auto">
          <SelectFilterForm conditions={(value) => ({ isActive: value })} options={statuses} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="UserType" />
        <SelectFilterDescription className="ms-2" conditions={(value) => ({ typeId: value })} options={userTypes} />
        <OptionMenu className="ms-auto">
          <SelectFilterForm conditions={(value) => ({ typeId: value })} options={userTypes} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="Terminal" />
        <SelectFilterDescription className="ms-2" conditions={(value) => ({ terminalId: value })} options={terminales} />
        <OptionMenu className="ms-auto">
          <SelectFilterForm conditions={(value) => ({ terminalId: value })} options={terminales} />
        </OptionMenu>
      </Header>
      <Header className="d-flex">
        <TranslatableText group={translationsGroupNames.Generic} entry="Actions" />
      </Header>
    </TecsoTable>
  );
};