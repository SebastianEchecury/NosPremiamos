import React from "react";
import { Card } from "@themesberg/react-bootstrap";

import { useGetQuery as useGetTerminalQuery } from "../../../redux/apis/terminales";
import { useTranslations } from '../../../components/translations';
import { translationsGroupNames } from "../../../utils/translationsGroupNames";

import Saldo from "../saldo";

export default function SaldoCuentaCorriente({ id }) {
  const { translations } = useTranslations({ group: translationsGroupNames.Terminales, keys: ['SaldoDisponibleCuentaCorriente'] });
  const { data: terminal = {} } = useGetTerminalQuery(id);

  return (
    <Card bg="primary" text="white">
      <Card.Body>
        <Saldo titulo={translations.SaldoDisponibleCuentaCorriente} valor={terminal.saldoCtaCte} />
      </Card.Body>
    </Card>
  );
}