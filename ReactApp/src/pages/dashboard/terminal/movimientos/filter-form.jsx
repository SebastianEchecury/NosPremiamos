import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { TranslatableText, useTranslations } from "../../../../components/translations";
import { translationsGroupNames } from "../../../../utils/translationsGroupNames";

export default ({ value = {}, onSubmit = ({ fechaDesde, fechaHasta }) => { } }) => {
  const { translations: genericTranslations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['FechaDesde', 'FechaHasta'] });
  const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired', 'FechaDesdeMayorFechaHasta'] });

  const formik = useFormik({
    initialValues: { fechaDesde: '', fechaHasta: '', ...value },
    validationSchema: Yup.object().shape({
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
    onSubmit: ({ fechaDesde, fechaHasta }) => {
      onSubmit({ fechaDesde, fechaHasta });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col xs="auto">
          <Form.Control type="date" {...formik.getFieldProps('fechaDesde')} isInvalid={!!formik.errors.fechaDesde} />
          <Form.Control.Feedback type="invalid">{formik.errors.fechaDesde}</Form.Control.Feedback>
        </Col>
        <Col xs="auto">
          <Form.Control type="date" {...formik.getFieldProps('fechaHasta')} isInvalid={!!formik.errors.fechaHasta} />
          <Form.Control.Feedback type="invalid">{formik.errors.fechaHasta}</Form.Control.Feedback>
        </Col>
        <Col xs="auto">
          <OverlayTrigger overlay={<Tooltip><TranslatableText group={translationsGroupNames.Generic} entry="Search" /></Tooltip>}>
            <Button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
    </Form>
  );
};