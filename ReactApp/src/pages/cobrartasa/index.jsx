import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from '@themesberg/react-bootstrap';
import toast from 'react-hot-toast';
import { TranslatableText, useTranslations } from '../../components/translations';
import { useCobrarTasaMutation } from '../../redux/apis/terminales';
import { useGetListQuery as useGetRepresentantesPatntesListQuery } from '../../redux/apis/representante-patentes';
import { translationsGroupNames } from '../../utils/translationsGroupNames';
import { useGetByTokenQuery } from '../../redux/apis/parametros';
import { useGetItemsQuery as useGetRepresentantesItemsQuery } from '../../redux/apis/representantes';
import Select from '../patentes/select';

export default ({ id }) => {
  const { translations: representantesTranslations } = useTranslations({ group: translationsGroupNames.Representantes, keys: ['Patente', 'EsEscalableCamion', 'FormaPago'] });
  const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired', 'InvalidFormat'] });
  const [cobrarTasa, { isSuccess: isCobrarTasaSuccess, data: cobrarTasaData, isError: isCobrarTasaError, error: cobrarTasaError }] = useCobrarTasaMutation();
  const { data: { data: representantesPatente = [] } = {} } = useGetRepresentantesPatntesListQuery();
  const { data: representantes = [] } = useGetRepresentantesItemsQuery();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      representante: {id :0 },
      representantePatenteId: { id: 0 },
      esEscalable: '',
      escalable: '',
      esEfectivo: '',
      efectivo: 0,
      importe: ''
    },
    validationSchema: Yup.object().shape({
      representante: Yup.object().shape({
        id: Yup.number().integer().notOneOf([0], errorsTranslations.FieldRequired.replace('{0}', representantesTranslations.Representante)).required(errorsTranslations.FieldRequired.replace('{0}'))
      }),
      patente: Yup.object().shape({
        id: Yup.number().integer().notOneOf([0], errorsTranslations.FieldRequired.replace('{0}', representantesTranslations.Patente)).required(errorsTranslations.FieldRequired.replace('{0}'))
      }),
      escalable: Yup.string().required(errorsTranslations.FieldRequired.replace('{0}', representantesTranslations.EsEscalableCamion)),
      efectivo: Yup.string().required(errorsTranslations.FieldRequired.replace('{0}', representantesTranslations.FormaPago))
    }),
    onSubmit: (values) => {
      cobrarTasa({ esEfectivo: values.esEfectivo, importe: values.importe, esEscalable: values.esEscalable, representantePatenteId: values.patente.id });
    }
  });

  useEffect(() => {
    if (isCobrarTasaSuccess) {
      toast.success(cobrarTasaData.message);
      formik.resetForm();
    }
  }, [isCobrarTasaSuccess, cobrarTasaData]);

  useEffect(() => {
    if (isCobrarTasaError) {
      formik.setErrors(cobrarTasaError.data);

      const errors = [].concat(...Object.values(cobrarTasaError.data)).join('\n');
      toast.error(errors);
    }
  }, [isCobrarTasaError, cobrarTasaError]);

  useEffect(() => {
    if (formik.values.patente) {
      const repatente = representantesPatente.find((rp) => `${rp.id}` === formik.values.patente.id);
      if (repatente) {
        if(repatente.escalable)
        formik.setFieldValue('escalable', 1 ,true)

      }
      else{
        formik.setFieldValue('escalable', 0 ,false)
      }
    }
  }, [formik.values.patente]);

  useEffect(() => {
    if (formik.values.escalable == 0) {
      formik.setFieldValue('escalable', '', false);
      formik.setFieldValue('esEscalable', '', false);
      formik.setFieldValue('importe', '', false)
    }
    if (formik.values.escalable == 1) {
      formik.setFieldValue('escalable', 1, false);
      formik.setFieldValue('esEscalable', true, false);
      formik.setFieldValue('importe', 1200, false)
    }
    if (formik.values.escalable == 2) {
      formik.setFieldValue('escalable', 2, false);
      formik.setFieldValue('esEscalable', false, false);
      formik.setFieldValue('importe',1200, false)
    }
  }, [ formik.values.escalable, formik.values.esEscalable]);

  useEffect(() => {
    if (formik.values.efectivo == 1) {
      formik.setFieldValue('esEfectivo', true, false);
    }
    if (formik.values.efectivo == 0) {
      formik.setFieldValue('esEfectivo', false, false);
    }
  }, [formik.values.efectivo]);


  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>
            <TranslatableText group={translationsGroupNames.Terminales} entry="CobrarTasa" />
          </h4>
        </div>
        <div className="d-block  mb-4 mb-md-0">
          <Button type="submit">
            <TranslatableText group={translationsGroupNames.Terminales} entry="CobrarTasa" />
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
          <TranslatableText group={translationsGroupNames.Representantes} entry="Patente" />
        </Form.Label>
        <Select representante={formik.values.representante.id} {...formik.getFieldProps('patente.id')} isInvalid={!!formik.errors.patente?.id} />
        <Form.Control.Feedback type="invalid">{formik.errors.patente?.id}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          <TranslatableText group={translationsGroupNames.Representantes} entry="EsEscalableCamion" />
        </Form.Label>
        <Form.Select {...formik.getFieldProps('escalable')} isInvalid={!!formik.errors.escalable}>
          <option value="0"></option>
          <option value="1">Si</option>
          <option value="2">No</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">{formik.errors.escalable}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          <TranslatableText group={translationsGroupNames.Representantes} entry="FormaPago" />
        </Form.Label>
        <Form.Select  {...formik.getFieldProps('efectivo')} isInvalid={!!formik.errors.efectivo}>
          <option value="0">Cuenta Corriente</option>
          <option value="1">Efectivo</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">{formik.errors.efectivo}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          <TranslatableText group={translationsGroupNames.Representantes} entry="ImporteCobrarTasa" />
        </Form.Label>
        <Form.Control  {...formik.getFieldProps('importe')} type="text" disabled={true} isInvalid={!!formik.errors.fechaHasta} />
        <Form.Control.Feedback type="invalid">{formik.errors.fechaHasta}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};