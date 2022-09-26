import React, { useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Form, Row } from '@themesberg/react-bootstrap';
import toast from 'react-hot-toast';

import { TranslatableText } from '../../components/translations';
import {  useGetQuery as useGetUserQuery, useUpdateMutation } from '../../redux/apis/parametros';
import { Section, SectionBody, SectionHeader, SectionTitle } from '../../components/section';

export default function UserForm({ Id, disabled = false }) {
  const history = useHistory();
  const [update, { isSuccess: isUpdateSuccess, data: updateData, isError: isUpdateError, error: updateError }] = useUpdateMutation();
  const { data: { Token, Descripcion, Valor } = {} } = useGetUserQuery(Id, { skip: !!!Id });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Id: Id,
      Token: Token || '',
      Descripcion: Descripcion || '',
      Valor: Valor || '',
    },
    validationSchema: Yup.object().shape({      
      Descripcion: Yup.string().required('Debe ingresar una descripción'),
      Valor: Yup.string().required( 'Debe ingresar Valor'),   
    }),
    onSubmit: (values) => {
      if (Id) {
        return update(values);
      }
    }
  });

  const onCancelClick = () => {
    history.goBack();
  };

  useEffect(() => {
      
    if (isUpdateSuccess) {
      toast.success("Parámetro se edito con exito");
      history.goBack();
    }
  }, [isUpdateSuccess, updateData]);

  useEffect(() => { 
      
    if (isUpdateError) {
      toast.error([].concat(...Object.values(JSON.parse(updateError.data).Messages)));
    }
  }, [isUpdateError, updateError]);

  return (
    <Form onSubmit={formik.handleSubmit} className="pt-4">
      <Section>
        <SectionHeader className="d-flex align-items-center">
          <SectionTitle className="flex-fill">
            <TranslatableText  entry="Parámetros" />
          </SectionTitle>
          <div className="d-block">
            <Button type="button" variant="outline-primary" onClick={onCancelClick}>
              <TranslatableText entry="Cancelar" />
            </Button>
            <Button type="submit" className="ms-2" hidden={disabled}>
              <TranslatableText entry="Guardar" />
            </Button>
          </div>
        </SectionHeader>
        <SectionBody>
          <Row>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <TranslatableText  entry="Token" />
                </Form.Label>
                <Form.Control type="text" {...formik.getFieldProps('Token')}  disabled={true} />                
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <TranslatableText  entry="Descripción" />
                </Form.Label>
                <Form.Control type="text"  {...formik.getFieldProps('Descripcion')} isInvalid={!!formik.errors.Descripcion && formik.touched.Descripcion} disabled={disabled} />
                <Form.Control.Feedback type="invalid">{formik.errors.Descripcion}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <TranslatableText  entry="Valor" />
                </Form.Label>
                <Form.Control type="text"  {...formik.getFieldProps('Valor')} isInvalid={!!formik.errors.Apellido && formik.touched.Apellido} disabled={disabled} />
                <Form.Control.Feedback type="invalid">{formik.errors.Apellido}</Form.Control.Feedback>
              </Form.Group>
            </Col>            
          </Row>          
          </SectionBody>
      </Section>
    </Form>
  );
};