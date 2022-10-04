import React from 'react';

import Manager from '../../components/manager';
import withRedux from '../../redux/hoc/manager';

import Table from './table';
import Header from './header';
import { api as votos } from '../../redux/apis/votos';

const MisVotos = ({ source, onQueryChange }) => {

 
  return (
    <>
      <Manager header={Header}  entry={'Mis Votos'} table={Table} source={source} onQueryChange={onQueryChange} />
    
    </>
  );
};

export default withRedux(votos)(MisVotos);