import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Tab, Tabs } from '@themesberg/react-bootstrap';
import toast from 'react-hot-toast';

import { TranslatableText, useTranslations } from '../../../components/translations';
import { useAddMutation, useGetQuery as useGetTerminalQuery, useUpdateMutation } from '../../../redux/apis/terminales';
import { translationsGroupNames } from '../../../utils/translationsGroupNames';

export default function UserForm({ id, disabled = false }) {
  const history = useHistory();
  const [add, { isSuccess: isAddSuccess, data: addData, isError: isAddError, error: addError }] = useAddMutation();
  const [update, { isSuccess: isUpdateSuccess, data: updateData, isError: isUpdateError, error: updateError }] = useUpdateMutation();

  const { translations: genericTranslations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['FirstName', 'General', 'Terminal'] });
  const { translations: terminalesTranslations } = useTranslations({ group: translationsGroupNames.Terminales, keys: ['Terminales', 'Cuit', 'NumeroDePlanta'] });
  const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired', 'InvalidFormat'] });

  const { data: { nombre, cuit, nroPlanta } = {} } = useGetTerminalQuery(id, { skip: !!!id });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id || 0,
      nombre: nombre || '',
      cuit: cuit || 0,
      nroPlanta: nroPlanta || 0,
    },
    validationSchema: Yup.object().shape({
      nombre: Yup.string().required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.FirstName)),
      cuit: Yup.number()
              .notOneOf([0], errorsTranslations.FieldRequired.replace('{0}', terminalesTranslations.Cuit))
              .test('len', errorsTranslations.InvalidFormat.replace('{0}', terminalesTranslations.Cuit), (val) => val?.toString().length === 11)
              .required(errorsTranslations.FieldRequired.replace('{0}', terminalesTranslations.Cuit)),
      nroPlanta: Yup.number()
                  .notOneOf([0], errorsTranslations.FieldRequired.replace('{0}', terminalesTranslations.NumeroDePlanta))
                  .required(errorsTranslations.FieldRequired.replace('{0}', terminalesTranslations.NumeroDePlanta)),
    }),
    onSubmit: (values) => {
      if (id) {
        return update(values);
      }
      else
      {
        return add(values);
      }
    }
  });

  const onCancelClick = () => {
    formik.resetForm();
    history.goBack();
  };

  useEffect(() => {
    if (isAddSuccess) {
      toast.success(addData.message);
      formik.resetForm();
      history.goBack();
    }
    else if (isUpdateSuccess) {
      toast.success(updateData.message);
      formik.resetForm();
      history.goBack();
    }
  }, [isAddSuccess, addData, isUpdateSuccess, updateData]);

  useEffect(() => {
    if (isAddError) {
      toast.error(addError.data.cuit);
      formik.setErrors({cuit: addError.data.cuit});
    }
    else if (isUpdateError) {
      toast.error(updateError.data.cuit);
      formik.setErrors({cuit: updateError.data.cuit});
    }
  }, [isAddError, addError, isUpdateError, updateError]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>{terminalesTranslations.Terminales}</h4>
        </div>
        <div className="d-block mb-4 mb-md-0">
          <Button type="submit" hidden={disabled}>
            <TranslatableText group={translationsGroupNames.Generic} entry="Save" />
          </Button>
          <Button type="button" onClick={onCancelClick}>
            <TranslatableText group={translationsGroupNames.Generic} entry="Cancel" />
          </Button>
        </div>
      </div>
          <Form.Group className="mb-3">
            <Form.Label>
              <TranslatableText group={translationsGroupNames.Generic} entry="FirstName" />
            </Form.Label>
            <Form.Control type="text" {...formik.getFieldProps('nombre')} isInvalid={!!formik.errors.nombre} disabled={disabled} autoFocus/>
            <Form.Control.Feedback type="invalid">{formik.errors.nombre}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <TranslatableText group={translationsGroupNames.Terminales} entry="Cuit" />
            </Form.Label>
            <Form.Control type="number"  {...formik.getFieldProps('cuit')} isInvalid={!!formik.errors.cuit} disabled={disabled} />
            <Form.Control.Feedback type="invalid">{formik.errors.cuit}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <TranslatableText group={translationsGroupNames.Terminales} entry="NumeroDePlanta" />
            </Form.Label>
            <Form.Control type="number"  {...formik.getFieldProps('nroPlanta')} isInvalid={!!formik.errors.nroPlanta} disabled={disabled} />
            <Form.Control.Feedback type="invalid">{formik.errors.nroPlanta}</Form.Control.Feedback>
          </Form.Group>
    </Form>
  );
};