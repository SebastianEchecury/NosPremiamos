import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Modal } from "@themesberg/react-bootstrap";

import { TranslatableText, useTranslations } from "../../../../components/translations";
import { translationsGroupNames } from "../../../../utils/translationsGroupNames";

export default ({ show, onClose = () => { }, onSubmit = (values) => { } }) => {
  const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired', 'ImporteMenorIgualCero'] });
  const { translations: representantesTranslations } = useTranslations({ group: translationsGroupNames.Representantes, keys: ['Importe'] });

  const cancelHandler = () => {
    formik.setFieldValue('importe', '', false);
    formik.setFieldError('importe', '');
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      importe: ''
    },
    validationSchema: Yup.object().shape({
      importe: Yup.number().moreThan(0, errorsTranslations.ImporteMenorIgualCero).required(errorsTranslations.FieldRequired.replace('{0}', representantesTranslations.Importe))
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    }
  });

  return (
    <Modal show={show} backdrop="static" keyboard={false} onHide={cancelHandler}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            <TranslatableText group={translationsGroupNames.Representantes} entry="CargarSaldo" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>
              <TranslatableText group={translationsGroupNames.Representantes} entry="Importe" />
            </Form.Label>
            <Form.Control type="number" {...formik.getFieldProps('importe')} isInvalid={!!formik.errors.importe} />
            <Form.Control.Feedback type="invalid">{formik.errors.importe}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="outline-primary" onClick={cancelHandler}>
            <TranslatableText group={translationsGroupNames.Generic} entry="Cancel" />
          </Button>
          <Button type="submit">
            <TranslatableText group={translationsGroupNames.Representantes} entry="CargarSaldo" />
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};