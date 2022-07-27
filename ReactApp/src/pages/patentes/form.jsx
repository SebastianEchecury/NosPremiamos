import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from '@themesberg/react-bootstrap';
import toast from 'react-hot-toast';

import { TranslatableText, useTranslations } from '../../components/translations';
import { translationsGroupNames } from "../../utils/translationsGroupNames";
import { useAddMutation } from '../../redux/apis/representante-patentes';

export default function PatenteForm({ id }) {
  const history = useHistory();
  const [add, { isSuccess: isAddSuccess, data: addData, isError: isAddError, error: addError }] = useAddMutation();

  const { translations: representantesTranslations } = useTranslations({ group: translationsGroupNames.Representantes, keys: ['Patente'] });
  const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired', 'InvalidFormat'] });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      patente: '',
      escalable: false,
      representanteId: 0
    },
    validationSchema: Yup.object().shape({
      patente: Yup.string().required(errorsTranslations.FieldRequired.replace('{0}', representantesTranslations.Patente))
    }),
    onSubmit: (values) => {
      return add(values);
    }
  });

  const onCancelClick = () => {
    history.goBack();
  };

  useEffect(() => {
    if (isAddSuccess) {
      toast.success(addData.message);
      history.goBack();
    }
  }, [isAddSuccess, addData]);

  useEffect(() => {
    if (isAddError) {
      formik.setErrors(addError.error);
    }
  }, [isAddError, addError]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>
            <TranslatableText group={translationsGroupNames.Representantes} entry="Patente" />
          </h4>
        </div>
        <div className="d-block mb-4 mb-md-0">
          <Button type="submit">
            <TranslatableText group={translationsGroupNames.Generic} entry="Save" />
          </Button>
          <Button type="button" onClick={onCancelClick}>
            <TranslatableText group={translationsGroupNames.Generic} entry="Cancel" />
          </Button>
        </div>
      </div>
      <Form.Group className="mb-3">
        <Form.Label>
          <TranslatableText group={translationsGroupNames.Representantes} entry="Patente" />
        </Form.Label>
        <Form.Control autoFocus type="text" {...formik.getFieldProps('patente')} isInvalid={!!formik.errors.patente} />
        <Form.Control.Feedback type="invalid">{formik.errors.patente}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};