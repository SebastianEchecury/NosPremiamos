import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Manager from '../../../components/manager';
import { api as cupos } from '../../../redux/apis/cupos';
import withRedux from '../../../redux/hoc/manager';

import Table from './table';
import Header from './header';

const Cupos = ({ source, onQueryChange }) => {
    return (
        <>
        <Manager header={Header} table={Table} source={source} onQueryChange={onQueryChange} />
        </>
    );
};

export default withRedux(cupos)(Cupos);