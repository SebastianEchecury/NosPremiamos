import React from "react";
import { Card } from "@themesberg/react-bootstrap";

import { TranslatableText } from "../../../components/translations";

export default function Descuentos({ id }) {

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <TranslatableText  entry="Descuentos" />
        </Card.Title>
        <div className="mt-3">
        <TranslatableText  entry="Próximamente " />
        </div>
      </Card.Body>
    </Card>
  );
}