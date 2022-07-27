import React from "react";
import { Card } from "@themesberg/react-bootstrap";

import { TranslatableText } from "../../../../components/translations";

import { useGetMovimientosQuery } from "../../../../redux/apis/representantes";
import { translationsGroupNames } from "../../../../utils/translationsGroupNames";
import Movimiento from "./movimiento";

export default function Movimientos({ id }) {
  const { data: movimientos = {} } = useGetMovimientosQuery({ filter: { representanteId: id }, order: [{ fecha: 'desc' }], pagination: { size: 5 } });

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <TranslatableText group={translationsGroupNames.Generic} entry="UltimosMovimientos" />
        </Card.Title>
        <div className="mt-2">
          {(movimientos.data || []).map((movimiento) => (<Movimiento key={movimiento.id} value={movimiento} />))}
        </div>
      </Card.Body>
    </Card>
  );
}