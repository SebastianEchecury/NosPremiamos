import React from 'react';

import Manager from '../../../../components/manager';
import { api as talonariostickets } from '../../../../redux/apis/talonario-tickets';
import withRedux from '../../../../redux/hoc/manager';

import Table from './table';
import Header from './header';

const Tickets = ({ source, onQueryChange }) => {
  return (
    <Manager header={Header} table={Table} source={source} onQueryChange={onQueryChange} />
  );
};

export default withRedux(talonariostickets)(Tickets);