import React from "react";

import { TranslatableText } from "../../../../components/translations";
import { TiposMovimiento, useGetMovimientosQuery } from "../../../../redux/apis/terminales";
import { translationsGroupNames } from "../../../../utils/translationsGroupNames";

import './entries-count.scss';

export default function EntriesCount({ id, fechaDesde, fechaHasta }) {
  const { data: movimientos = {} } = useGetMovimientosQuery({ filter: { terminalId: id, fechaDesde, fechaHasta, tiposMovimientoId: [TiposMovimiento.CobroCuentaCorriente, TiposMovimiento.CobroEfectivo] }, pagination: { size: 0 } });

  return (
    <div className="dashboard-terminal-movimientos-container">
      <h3 className="dashboard-terminal-movimientos-count-text">{movimientos.length || 0}</h3>
      <small className="dashboard-terminal-movimientos-description-text"><TranslatableText group={translationsGroupNames.Generic} entry="CantidadEntradas" /></small>
    </div>
  );
}