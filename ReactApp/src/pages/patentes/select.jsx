import React from 'react';
import { Form } from '@themesberg/react-bootstrap';

import { useGetItemsQuery } from '../../redux/apis/representante-patentes';

export default ({ representante, ...props }) => {
  const { data: patentes = [] } = useGetItemsQuery({ filter: { representanteId: representante } }, { skip: !!!representante });

  return (
    <Form.Select {...props}>
      <option value="0"></option>
      {patentes.map((patente) => (<option key={patente.id} value={`${patente.id}`}>{patente.description}</option>))}
    </Form.Select>
  );
};