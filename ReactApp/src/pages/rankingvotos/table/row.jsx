import React from 'react';
import { Cell, Row as TecsoRow } from '../../../components/table';

export default function Row({ value, index, values }) {

  return (
    <TecsoRow>
      <Cell>{value.Categoria}</Cell>
      <Cell>{value.Ganador}</Cell>
      <Cell>{value.CantVotos}</Cell>
      <Cell>{value.VotosCategoria}</Cell>
    </TecsoRow>
  );
}