import React, { useEffect, useState } from "react";
import { Button, Card } from "@themesberg/react-bootstrap";

import { useGetByTokenQuery } from '../../../../redux/apis/parametros';
import { useCargarSaldoMutation, useGetQuery as useGetRepresentanteQuery } from '../../../../redux/apis/representantes';
import { TranslatableText, useTranslations } from '../../../../components/translations';
import { translationsGroupNames } from "../../../../utils/translationsGroupNames";

import CargaSaldoModalForm from "./carga-saldo-modal-form";
import MercadoPagoCheckout from "./mercado-pago-checkout";

import Saldo from "../../saldo";
import PermissionChecker from "../../../../components/permissionChecker";
import { permissionsKeys } from "../../../../utils/permissionsKeys";

export default ({ id }) => {
  const { translations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['SaldoDisponible'] });
  const { data: representante = {}, refetch: refetchRepresentante } = useGetRepresentanteQuery(id);
  const [cargarSaldo, { isSuccess: successCargaSaldo, data: dataCargaSaldo }] = useCargarSaldoMutation();
  const { data: parametroMercadoPago } = useGetByTokenQuery('MERCADO_PAGO_PUBLIC_KEY');

  const [showCargaSaldo, setShowCargaSaldo] = useState(false);
  const [mercadoPagoPreferenceId, setMercadoPagoPreferenceId] = useState();

  const cargaSaldoButtonClickHandler = () => {
    setShowCargaSaldo(true);
  };
  const cargaSaladoModalFormCloseHandler = () => {
    setShowCargaSaldo(false);
  };
  const cargaSaldoModalFormSubmitHandler = ({ importe }) => {
    setShowCargaSaldo(false);
    cargarSaldo(importe);
  };
  const mercadoPagoCheckoutCloseHandler = () => {
    setMercadoPagoPreferenceId();
  };
  const mercadoPagoCheckoutSubmitHandler = () => {
    setMercadoPagoPreferenceId();
    refetchRepresentante();
  };

  useEffect(() => {
    if (successCargaSaldo) {
      setShowCargaSaldo(false);
      setMercadoPagoPreferenceId(dataCargaSaldo.preferenceIntegracionId);
    }
  }, [successCargaSaldo]);

  return (
    <>
      <Card bg="primary" text="white">
        <Card.Body>
          <Saldo titulo={translations.SaldoDisponible} valor={representante.saldoCtaCte} />
          <div className="text-end">
            <Button variant="secondary" onClick={cargaSaldoButtonClickHandler}>
              <TranslatableText group={translationsGroupNames.Representantes} entry="CargarSaldo" />
            </Button>
          </div>
        </Card.Body>
      </Card>
      <CargaSaldoModalForm show={showCargaSaldo} onClose={cargaSaladoModalFormCloseHandler} onSubmit={cargaSaldoModalFormSubmitHandler} />
      {parametroMercadoPago && mercadoPagoPreferenceId && <MercadoPagoCheckout token={parametroMercadoPago.valor} preference={mercadoPagoPreferenceId} onClose={mercadoPagoCheckoutCloseHandler} onSubmit={mercadoPagoCheckoutSubmitHandler} />}
    </>
  );
};