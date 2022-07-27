import { Col, Row } from "@themesberg/react-bootstrap";
import React, { useState } from "react";

import HideButton from "./hide-button";
import ViewButton from "./view-button";

const ValorFormat = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'ARS', currencyDisplay: 'narrowSymbol' });

export default ({ titulo, valor = 0 }) => {
  const [hidden, setHidden] = useState(false);

  const viewToogleHandler = () => {
    setHidden((previous) => !previous);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col xs="auto">
          <h6 className="text-muted">{titulo}</h6>
        </Col>
        <Col className="text-end">
          {hidden && <ViewButton onClick={viewToogleHandler} />}
          {!hidden && <HideButton onClick={viewToogleHandler} />}
        </Col>
      </Row>
      <h3>{(hidden) ? '****' : ValorFormat.format(valor)}</h3>
    </>
  );
};