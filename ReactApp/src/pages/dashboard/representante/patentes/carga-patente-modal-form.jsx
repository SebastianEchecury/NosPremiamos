import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Modal } from "@themesberg/react-bootstrap";

import { TranslatableText, useTranslations } from "../../../../components/translations";
import { translationsGroupNames } from "../../../../utils/translationsGroupNames";
import { useEffect } from "react";

export default function CargaPatenteModalForm({ show, errors, onClose = () => { }, onSubmit = (values) => { } }) {
  const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired'] });
  const { translations: representantesTranslations } = useTranslations({ group: translationsGroupNames.Representantes, keys: ['Patente'] });

  const cancelHandler = () => {
    onClose();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      patente: ''
    },
    initialErrors: errors,
    validationSchema: Yup.object().shape({
      patente: Yup.string().required(errorsTranslations.FieldRequired.replace('{0}', representantesTranslations.Patente))
    }),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  useEffect(() => {
    formik.resetForm();
  }, [show]);

  return (
    <Modal show={show} backdrop="static" keyboard={false} onHide={cancelHandler}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            <TranslatableText group={translationsGroupNames.Representantes} entry="Patente" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>
              <TranslatableText group={translationsGroupNames.Representantes} entry="Patente" />
            </Form.Label>
            <Form.Control autoFocus type="text" {...formik.getFieldProps('patente')} isInvalid={!!formik.errors.patente} />
            <Form.Control.Feedback type="invalid">{formik.errors.patente}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="outline-primary" onClick={cancelHandler}>
            <TranslatableText group={translationsGroupNames.Generic} entry="Cancel" />
          </Button>
          <Button type="submit" className="ms-2">
            <TranslatableText group={translationsGroupNames.Generic} entry="Save" />
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}