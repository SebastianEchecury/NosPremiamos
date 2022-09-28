import React from 'react';

import Manager from '../../components/manager';
import withRedux from '../../redux/hoc/manager';

import Table from './table';
import Header from './header';
import { api as parametros } from '../../redux/apis/parametros';

const Parametros = ({ source, onQueryChange }) => {

 
  return (
    <>
      <Manager header={Header}  entry={'Parámetros'} table={Table} source={source} onQueryChange={onQueryChange} />
    
    </>
  );
};

export default withRedux(parametros)(Parametros);