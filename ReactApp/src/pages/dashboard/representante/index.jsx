import React from "react";
import { Col, Row } from "@themesberg/react-bootstrap";

import Movimientos from "./movimientos";
import Pantentes from "./patentes";
import Saldo from "./saldo";
import PermissionChecker from "../../../components/permissionChecker";
import { permissionsKeys } from "../../../utils/permissionsKeys";

export default ({ id }) => {
  return (
    <Row>
      <Col sm="auto" hidden={!PermissionChecker(permissionsKeys.REPRESENTANTE_CARGAR_SALDO_MANAGER)}>
        <Saldo id={id} />
      </Col>
      <Col xs="auto" hidden={!PermissionChecker(permissionsKeys.REPRESENTANTE_PATENTE_MOVIMIENTOS_VER)}>
        <Movimientos id={id} />
      </Col>
      <Col xs="auto" hidden={!PermissionChecker(permissionsKeys.REPRESENTANTE_PATENTE_MANAGER)}>
        <Pantentes id={id} />
      </Col>
    </Row>
  );
};