import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from '@themesberg/react-bootstrap';
import toast from 'react-hot-toast';

import { TranslatableText, useTranslations } from '../../components/translations';
import { useAddCtgMutation } from '../../redux/apis/cupos';
import { useGetQuery as useGetTerminalQuery } from '../../redux/apis/terminales';
import { translationsGroupNames } from '../../utils/translationsGroupNames';

export default ({ id }) => {
  const { translations: genericTranslations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['FechaDesde', 'FechaHasta', 'Terminal'] });
  const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired', 'InvalidFormat', 'FechaDesdeMayorFechaHasta'] });
  const [add, { isSuccess: isAddSuccess, data: addData, isError: isAddError, error: addError }] = useAddCtgMutation();
  const { data: terminal = {} } = useGetTerminalQuery(id);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      terminal: { id: terminal.id },
      fechaDesde: '',
      fechaHasta: ''
    },
    validationSchema: Yup.object().shape({
      terminal: Yup.object().shape({
        id: Yup.number().integer().notOneOf([0], errorsTranslations.FieldRequired.replace('{0}', genericTranslations.Terminal)).required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.Terminal))
      }),
      fechaDesde: Yup.date().when('fechaHasta', (fechaHasta, schema) => {
        if (fechaHasta) {
          return schema.max(fechaHasta, errorsTranslations.FechaDesdeMayorFechaHasta).required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.FechaDesde));
        }
        else {
          return schema.required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.FechaDesde));
        }
      }),
      fechaHasta: Yup.date().required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.FechaHasta))
    }),
    onSubmit: ({ terminal, fechaDesde, fechaHasta }) => {
      add({ terminalId: terminal.id, fechaDesde, fechaHasta });
    }
  });

  useEffect(() => {
    if (isAddSuccess) {
      toast.success(addData.message);
      formik.resetForm();
    }
  }, [isAddSuccess, addData]);

  useEffect(() => {
    if (isAddError) {
      console.debug(addError);

      formik.setErrors(addError.data);

      const errors = [].concat(...Object.values(addError.data)).join('\n');
      toast.error(errors);
    }
  }, [isAddError, addError]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>
            <TranslatableText group={translationsGroupNames.Terminales} entry="OtorgarCuposDesdeCtg" />
          </h4>
        </div>
        <div className="d-block mb-4 mb-md-0">
          <Button type="submit">
            <TranslatableText group={translationsGroupNames.Generic} entry="Ejecutar" />
          </Button>
        </div>
      </div>
      <Form.Group className="mb-3">
        <Form.Label>
          <TranslatableText group={translationsGroupNames.Generic} entry="Terminal" />
        </Form.Label>
        <Form.Control plaintext readOnly defaultValue={terminal.nombre} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          <TranslatableText group={translationsGroupNames.Generic} entry="FechaDesde" />
        </Form.Label>
        <Form.Control type="date" {...formik.getFieldProps('fechaDesde')} isInvalid={!!formik.errors.fechaDesde} />
        <Form.Control.Feedback type="invalid">{formik.errors.fechaDesde}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          <TranslatableText group={translationsGroupNames.Generic} entry="FechaHasta" />
        </Form.Label>
        <Form.Control type="date" {...formik.getFieldProps('fechaHasta')} isInvalid={!!formik.errors.fechaHasta} />
        <Form.Control.Feedback type="invalid">{formik.errors.fechaHasta}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};