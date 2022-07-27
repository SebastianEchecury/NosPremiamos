import React from 'react';

import Manager from '../../../components/manager';
import { api as talonarios } from '../../../redux/apis/talonarios';
import withRedux from '../../../redux/hoc/manager';

import Table from './table';
import Header from './header';

const TalonariosTickets = ({ source, onQueryChange }) => {
  return (
    <Manager header={Header} table={Table} source={source} onQueryChange={onQueryChange} />
  );
};

export default withRedux(talonarios)(TalonariosTickets);