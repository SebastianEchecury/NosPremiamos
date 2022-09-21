import React from 'react';

import Manager from '../../../components/manager';
import { api as empleadosRepresentantes } from '../../../redux/apis/empleadoscategorias';
import withRedux from '../../../redux/hoc/manager';


import Table from './table';
import Header from './header';

const EmpleadosRepresentantes = ({ source, onQueryChange }) => {
  return (
    <Manager header={Header} entry={'Aprobadores'} table={Table} source={source} onQueryChange={onQueryChange} />
    
  );
};

export default withRedux(empleadosRepresentantes)(EmpleadosRepresentantes);