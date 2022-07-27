import React, { useState } from "react";
import { DateTime } from "luxon";
import { Card, Col, Row } from "@themesberg/react-bootstrap";

import { TranslatableText } from "../../../../components/translations";
import { translationsGroupNames } from "../../../../utils/translationsGroupNames";
import FilterForm from "./filter-form";
import EntriesCount from "./entries-count";

export default ({ id }) => {
  const [{ fechaDesde, fechaHasta }, setFilter] = useState({ fechaDesde: DateTime.now().startOf('month').toISODate(), fechaHasta: DateTime.now().endOf('month').toISODate() });

  const filterSubmitHandler = ({ fechaDesde, fechaHasta }) => {
    setFilter({ fechaDesde, fechaHasta });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title className="me-4">
          <TranslatableText group={translationsGroupNames.Generic} entry="Movimientos" />
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Row className="align-items-center">
          <Col xs="auto">
            <FilterForm value={{ fechaDesde, fechaHasta }} onSubmit={filterSubmitHandler} />
          </Col>
          <Col xs="auto">
            <EntriesCount id={id} fechaDesde={fechaDesde} fechaHasta={fechaHasta} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};