import React, { useEffect } from 'react';
import { Button, Form } from '@themesberg/react-bootstrap';
import toast from 'react-hot-toast';
import { DateTime } from 'luxon';
import * as XLSX from 'xlsx/xlsx.mjs';

import { TranslatableText } from '../../components/translations';
import { useGetQuery, useLiquidarCuentaCorrienteMutation } from '../../redux/apis/terminales';
import { translationsGroupNames } from '../../utils/translationsGroupNames';
import PermissionChecker from '../../components/permissionChecker';
import { permissionsKeys } from '../../utils/permissionsKeys';

export default ({ id = 0 }) => {
  const { data: terminal = {}, isError: isTerminalGetError, error: terminalGetError } = useGetQuery(id, { skip: !!!id });
  const [liquidar, { isSuccess: isLiquidacionSuccess, data: liquidacionData, isError: isLiquidacionError, error: liquidacionError }] = useLiquidarCuentaCorrienteMutation();
  const permiteDescargarReporte = PermissionChecker(permissionsKeys.TERMINAL_LIQUIDACION_DESCARGAR);

  const submitHandler = (event) => {
    event.preventDefault();
    liquidar(terminal.saldoCtaCte);
  };

  useEffect(() => {
    if (isTerminalGetError) {
      const errors = Object.values(terminalGetError.data);
      toast.error(errors);
    }
  }, [isTerminalGetError, terminalGetError]);

  useEffect(() => {
    if (isLiquidacionSuccess) {
      toast.success(liquidacionData.message);

      if (permiteDescargarReporte) {
        const date = DateTime.now().toFormat('yyyyLLddHHmmss');
        const header = ['Número de ticket liquidado', 'Representante', 'Patente', 'Importe cobrado'];
        const data = liquidacionData.cupos.map((cupo) => [
          cupo.terminalTalonarioTicket.numero,
          `${cupo.representante.firstName} ${cupo.representante.lastName}`,
          cupo.representantePatente.patente,
          0
        ]);
        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.aoa_to_sheet([header, ...data, ['Total', '', '', { t: 'n', v: 3, f: `SUM(D2:D${data.length + 1})` }]]);
        XLSX.utils.book_append_sheet(workbook, sheet, 'liquidacion');
        XLSX.writeFile(workbook, `${terminal.nombre}Liquidacion${date}.xlsx`);
      }
    }
  }, [isLiquidacionSuccess, liquidacionData]);

  useEffect(() => {
    if (isLiquidacionError) {
      const errors = [].concat(...Object.values(liquidacionError.data)).join('\n');
      toast.error(errors);
    }
  }, [isLiquidacionError, liquidacionError]);

  return (
    <Form onSubmit={submitHandler}>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>
            <TranslatableText group={translationsGroupNames.Terminales} entry="LiquidarSaldoCuentaCorriente" />
          </h4>
        </div>
        <div className="d-block mb-4 mb-md-0">
          <Button type="submit">
            <TranslatableText group={translationsGroupNames.Generic} entry="Liquidar" />
          </Button>
        </div>
      </div>
      <h6 className="card-subtitle mb-2 text-muted">
        <TranslatableText group={translationsGroupNames.Terminales} entry="SaldoDisponibleCuentaCorriente" />
      </h6>
      <div className="d-flex">
        <h3>${terminal.saldoCtaCte || 0}</h3>
      </div>
    </Form>
  );
};