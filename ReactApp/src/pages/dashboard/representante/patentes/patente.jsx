import React from "react";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { TranslatableText } from "../../../../components/translations";
import { translationsGroupNames } from "../../../../utils/translationsGroupNames";
import PermissionChecker from "../../../../components/permissionChecker";
import { permissionsKeys } from "../../../../utils/permissionsKeys";

export default function Patente({ value, onDelete = (patente) => { } }) {
  const deleteHandler = () => {
    onDelete(value);
  };

  return (
    <Row className="align-items-center">
      <Col xs="auto">
        {value.patente}
      </Col>
      <Col className="text-end" hidden={!PermissionChecker(permissionsKeys.REPRESENTANTE_PATENTE_DELETE)}>
        <OverlayTrigger overlay={<Tooltip><TranslatableText group={translationsGroupNames.Generic} entry="Delete" /></Tooltip>}>
          <Button variant="link" className="text-danger" onClick={deleteHandler}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </OverlayTrigger>
      </Col>
    </Row>
  );
}