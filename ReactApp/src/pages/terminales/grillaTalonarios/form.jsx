import React, { useEffect , us} from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from '@themesberg/react-bootstrap';

import { TranslatableText, useTranslations } from '../../../components/translations';
import { useGetQuery as useGetTalonarioQuery } from '../../../redux/apis/talonarios';
import { translationsGroupNames } from "../../../utils/translationsGroupNames";

import Manager from '../../../components/manager';

import Table from './tabletickets/table/index';
import Header from './tabletickets/header';
import Tickets from './tabletickets'

export default function TalonarioTicketsForm({ id}) {
  const history = useHistory();
  const { translations: genericTranslations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['NumeroDesde', 'NumeroHasta', 'UltimoNumero', 'UltimoNumero', 'Cancel', 'Completo'] });
  const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired', 'InvalidFormat'] });
  const { translations: terminalesTranslations } = useTranslations({ group: translationsGroupNames.Terminales, keys: ['TalonariosTickets'] }); 
  const { data: talonario = {} } = useGetTalonarioQuery(id);



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id,
      numeroDesde: talonario.numeroDesde || '',
      numeroHasta: talonario.numeroHasta || '',
      ultimoNumero: talonario.ultimoNumero || '',
      completo: talonario.completo? 'si':'no' || ''
    },
    validationSchema: Yup.object().shape({
    }),
   
  });

  const onCancelClick = () => {
    history.goBack();
  };

 
 

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>{terminalesTranslations.TalonariosTickets}</h4>
        </div>
        <div className="d-block mb-4 mb-md-0">
          <Button type="button" onClick={onCancelClick}>
            <TranslatableText group={translationsGroupNames.Generic} entry="Cancel" />
          </Button>
        </div>
      </div>
        <Form.Group className="mb-3">
            <Form.Label>
              <TranslatableText group={translationsGroupNames.Generic} entry="NumeroDesde" />
            </Form.Label>
            <Form.Control autoFocus type="name" {...formik.getFieldProps('numeroDesde')} isInvalid={!!formik.errors.numeroDesde} disabled={true} />
            <Form.Control.Feedback type="invalid">{formik.errors.numeroDesde}</Form.Control.Feedback>
        </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <TranslatableText group={translationsGroupNames.Generic} entry="NumeroHasta" />
            </Form.Label>
            <Form.Control type="text"  {...formik.getFieldProps('numeroHasta')} isInvalid={!!formik.errors.numeroHasta} disabled={true} />
            <Form.Control.Feedback type="invalid">{formik.errors.numeroHasta}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <TranslatableText group={translationsGroupNames.Terminales} entry="UltimoNumero" />
            </Form.Label>
            <Form.Control type="text"  {...formik.getFieldProps('ultimoNumero')} isInvalid={!!formik.errors.ultimoNumero} disabled={true} />
            <Form.Control.Feedback type="invalid">{formik.errors.ultimoNumero}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <TranslatableText group={translationsGroupNames.Terminales} entry="Completo" />
            </Form.Label>
            <Form.Control type="text"  {...formik.getFieldProps('completo')} isInvalid={!!formik.errors.completo} disabled={true} />
            <Form.Control.Feedback type="invalid">{formik.errors.completo}</Form.Control.Feedback>
          </Form.Group> 
          <br/> 
          <Tickets filter={{terminalTalonarioId: id }}></Tickets>
    </Form>
  );
};