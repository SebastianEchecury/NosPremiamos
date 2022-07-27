import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from '@themesberg/react-bootstrap';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import Select from '../patentes/select';
import { TranslatableText, useTranslations } from '../../components/translations';
import { useAddMutation } from '../../redux/apis/cupos';
import { useGetItemsQuery as useGetRepresentantesItemsQuery } from '../../redux/apis/representantes';
import { translationsGroupNames } from '../../utils/translationsGroupNames';

export default ({ id }) => {
  const history = useHistory();
  const { translations: genericTranslations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['FechaDesde', 'FechaHasta'] });
  const { translations: representantesTranslations } = useTranslations({ group: translationsGroupNames.Representantes, keys: ['Representante', 'Patente'] });
  const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired', 'InvalidFormat', 'FechaDesdeMayorFechaHasta'] });
  const [add, { isSuccess: isAddSuccess, data: addData, isError: isAddError, error: addError }] = useAddMutation();
  const { data: representantes = [] } = useGetRepresentantesItemsQuery();

  const formik = useFormik({
    initialValues: {
      representante: { id: 0 },
      fechaDesde: '',
      fechaHasta: '',
      patente: { id: 0 }
    },
    validationSchema: Yup.object().shape({
      representante: Yup.object().shape({
        id: Yup.number().integer().notOneOf([0], errorsTranslations.FieldRequired.replace('{0}', representantesTranslations.Representante)).required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.Representante))
      }),
      fechaDesde: Yup.date().when('fechaHasta', (fechaHasta, schema) => {
        if (fechaHasta) {
          return schema.max(fechaHasta, errorsTranslations.FechaDesdeMayorFechaHasta).required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.FechaDesde));
        }
        else {
          return schema.required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.FechaDesde));
        }
      }),
      fechaHasta: Yup.date().required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.FechaHasta)),
      patente: Yup.object().shape({
        id: Yup.number().integer().notOneOf([0], errorsTranslations.FieldRequired.replace('{0}', representantesTranslations.Patente)).required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.Patente))
      })
    }),
    onSubmit: ({ representante, fechaDesde, fechaHasta, patente }) => {
      add({ representanteId: representante.id, fechaDesde, fechaHasta, representantePatenteId: patente.id });
    }
  });

  const onReturnClick = () => {
    history.goBack();
  }

  useEffect(() => {
    if (isAddSuccess) {
      toast.success(addData.message);
      formik.resetForm();
      history.goBack();
    }
  }, [isAddSuccess, addData]);

  useEffect(() => {
    if (isAddError) {
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
            <TranslatableText group={translationsGroupNames.Terminales} entry="OtorgarCupo" />
          </h4>
        </div>
        <div className="d-block mb-4 mb-md-0">
          <Button type="submit">
            <TranslatableText group={translationsGroupNames.Generic} entry="Otorgar" />
          </Button>
          <Button onClick={onReturnClick}>
            <TranslatableText group={translationsGroupNames.Generic} entry="Cancel" />
          </Button>
        </div>
      </div>
      <Form.Group className="mb-3">
        <Form.Label>
          <TranslatableText group={translationsGroupNames.Representantes} entry="Representante" />
        </Form.Label>
        <Form.Select {...formik.getFieldProps('representante.id')} isInvalid={!!formik.errors.representante?.id}>
          <option value="0"></option>
          {representantes.map((representante) => (<option key={representante.id} value={`${representante.id}`}>{representante.description}</option>))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{formik.errors.representante?.id}</Form.Control.Feedback>
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
      <Form.Group className="mb-3">
        <Form.Label>
          <TranslatableText group={translationsGroupNames.Representantes} entry="Patente" />
        </Form.Label>
        <Select representante={formik.values.representante.id} {...formik.getFieldProps('patente.id')} isInvalid={!!formik.errors.patente?.id} />
        <Form.Control.Feedback type="invalid">{formik.errors.patente?.id}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};