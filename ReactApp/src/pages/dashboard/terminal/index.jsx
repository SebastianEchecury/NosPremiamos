import { Col, Row } from "@themesberg/react-bootstrap";
import React from "react";
import Movimientos from "./movimientos";

import SaldoCuentaCorriente from "./saldo-cuenta-corriente";
import SaldoEfectivo from "./saldo-efectivo";

export default ({ id }) => {
  return (
    <Row>
      <Col xs="auto">
        <SaldoCuentaCorriente id={id} />
      </Col>
      <Col xs="auto">
        <SaldoEfectivo id={id} />
      </Col>
      <Col xs="auto">
        <Movimientos id={id} />
      </Col>
    </Row>
  );
};