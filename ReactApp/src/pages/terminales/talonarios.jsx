import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from '@themesberg/react-bootstrap';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { TranslatableText, useTranslations } from '../../components/translations';
import { useAddMutation } from '../../redux/apis/talonarios';
import { translationsGroupNames } from '../../utils/translationsGroupNames';

export default ({ id }) => {
  const history = useHistory();
  const { translations: genericTranslations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['NumberFrom', 'NumberTo'] });
  const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired', 'InvalidFormat'] });
  const [add, { isSuccess: isAddSuccess, data: addData, isError: isAddError, error: addError }] = useAddMutation();

  const formik = useFormik({
    initialValues: {
      numeroDesde: '',
      numeroHasta: ''
    },
    validationSchema: Yup.object().shape({
      numeroDesde: Yup.number().required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.NumberFrom)),
      numeroHasta: Yup.number().required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.NumberTo))
    }),
    onSubmit: ({ numeroDesde, numeroHasta }) => {
      add({ numeroDesde, numeroHasta });
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
            <TranslatableText group={translationsGroupNames.Terminales} entry="GenerarTalonariosTickets" />
          </h4>
        </div>
        <div className="d-block mb-4 mb-md-0">
          <Button type="submit">
            <TranslatableText group={translationsGroupNames.Generic} entry="Generar" />
          </Button>
          <Button onClick={onReturnClick}>
            <TranslatableText group={translationsGroupNames.Generic} entry="Cancel" />
          </Button>
        </div>
      </div>
      <Form.Group className="mb-3">
        <Form.Label>
          <TranslatableText group={translationsGroupNames.Generic} entry="NumeroDesde" />
        </Form.Label>
        <Form.Control type="number" {...formik.getFieldProps('numeroDesde')} isInvalid={!!formik.errors.numeroDesde} />
        <Form.Control.Feedback type="invalid">{formik.errors.numeroDesde}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          <TranslatableText group={translationsGroupNames.Generic} entry="NumeroHasta" />
        </Form.Label>
        <Form.Control type="number" {...formik.getFieldProps('numeroHasta')} isInvalid={!!formik.errors.numeroHasta} />
        <Form.Control.Feedback type="invalid">{formik.errors.numeroHasta}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};