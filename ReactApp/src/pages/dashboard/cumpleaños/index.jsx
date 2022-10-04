import React from "react";
import { Card } from "@themesberg/react-bootstrap";

import { TranslatableText } from "../../../components/translations";

export default function Cumpleaños({ id }) {

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <TranslatableText  entry="Cumpleaños del Mes" />
        </Card.Title>
        <div className="mt-3">
        <TranslatableText  entry="Próximamente " />
        </div>
      </Card.Body>
    </Card>
  );
}