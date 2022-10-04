import React from 'react';
import { Cell, Row as TecsoRow } from '../../../components/table';

export default function Row({ value, index, values }) {

  return (
    <TecsoRow>
      <Cell>{value.Votante}</Cell>
      <Cell>{value.Aprobador}</Cell>
      <Cell>{value.NombreCategoria}</Cell>
      <Cell>{value.Motivo}</Cell>
      <Cell>{value.FechaVoto}</Cell>
    </TecsoRow>
  );
}