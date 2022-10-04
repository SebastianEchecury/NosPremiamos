import React from "react";
import { Card } from "@themesberg/react-bootstrap";

import { TranslatableText } from "../../../components/translations";

export default function Novedades({ id }) {

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <TranslatableText  entry="Novedades" />
        </Card.Title>
        <div className="mt-3">
        <TranslatableText  entry="Próximamente " />
        </div>
      </Card.Body>
    </Card>
  );
}