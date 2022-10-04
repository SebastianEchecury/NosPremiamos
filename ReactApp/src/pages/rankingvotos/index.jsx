import React from 'react';

import Manager from '../../components/manager';
import withRedux from '../../redux/hoc/manager';

import Table from './table';
import Header from './header';
import { api as categorias } from '../../redux/apis/categorias';

const RankingVotos = ({ source, onQueryChange }) => {

 
  return (
    <>
      <Manager header={Header}  entry={'Rankin de Votos'} table={Table} source={source} onQueryChange={onQueryChange} />
    
    </>
  );
};

export default withRedux(categorias)(RankingVotos);