import React from "react";
import { Col, Row } from "@themesberg/react-bootstrap";
import { DateTime } from "luxon";

import { TiposMovimiento } from "../../../../redux/apis/representantes";

const ImporteFormat = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'ARS', currencyDisplay: 'narrowSymbol', signDisplay: 'exceptZero' });

export default function Movimiento({ value }) {
  let importe = value.importe;
  let color = '';

  if (value.tipoMovimientoRepresentanteId === TiposMovimiento.CargoSaldo) {
    color = 'text-success';
  }
  else if (value.tipoMovimientoRepresentanteId === TiposMovimiento.PagoTasa) {
    importe *= -1;
    color = 'text-danger';
  }

  return (
    <Row className="align-items-start">
      <Col xs="auto">
        <small className="text-muted">{DateTime.fromISO(value.fecha).toLocaleString()}</small>
      </Col>
      <Col xs="auto">
        <h6 className="mb-0">{value.tipoMovimientoRepresentante.nombre}</h6>
        <small className="text-muted">{value.descripcion}</small>
      </Col>
      <Col className={`text-end ${color}`}>
        <h6>{ImporteFormat.format(importe)}</h6>
      </Col>
    </Row>
  );
}