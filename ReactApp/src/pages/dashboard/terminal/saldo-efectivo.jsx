import React from "react";
import { Card } from "@themesberg/react-bootstrap";

import { useGetQuery as useGetTerminalQuery } from "../../../redux/apis/terminales";
import { useTranslations } from '../../../components/translations';
import { translationsGroupNames } from "../../../utils/translationsGroupNames";

import Saldo from "../saldo";

export default function SaldoEfectivo({ id }) {
  const { translations } = useTranslations({ group: translationsGroupNames.Terminales, keys: ['SaldoDisponibleEfectivo'] });
  const { data: terminal = {} } = useGetTerminalQuery(id);

  return (
    <Card bg="primary" text="white">
      <Card.Body>
        <Saldo titulo={translations.SaldoDisponibleEfectivo} valor={terminal.saldoEfectivo} />
      </Card.Body>
    </Card>
  );
}