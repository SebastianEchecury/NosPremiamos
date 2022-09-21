import React from 'react';
import { Cell, Row as TecsoRow } from '../../../../components/table';

export default function Row({ value, index, values }) {

  return (
    <TecsoRow>
      <Cell>{value.Empleado.Nombre}</Cell>
      <Cell>{value.Empleado.Apellido}</Cell>
    </TecsoRow>
  );
}