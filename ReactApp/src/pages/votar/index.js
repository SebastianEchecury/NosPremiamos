import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { TranslatableText } from '../../components/translations';
import { useAddMutation } from '../../redux/apis/votos';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../routes';
import { Section, SectionBody, SectionHeader, SectionTitle } from '../../components/section';
import { useGetListQuery as useGetEmpleadosItemsQuery, useGetHeaderQuery} from '../../redux/apis/users';
import { useGetListQuery as useGetCategoriaItemsQuery} from '../../redux/apis/categorias';

export default ({ id }) => {
  const [add, { isSuccess: isVotarSuccess, data: votarData, isError: isVotarError, error: votarError }] = useAddMutation();
  const { data: header } = useGetHeaderQuery();
  const { data: { data: empleados = [] } = {} } = useGetEmpleadosItemsQuery({filter:{Eliminado: false}});
  const { data: { data: categorias = [] } = {} } = useGetCategoriaItemsQuery({filter: {EstadoId: 1}});
  const history = useHistory();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      VotadoEmpleadoId: { id: 0 },
      VotanteEmpleadoId: header?.DataObject?.Id,
      CategoriaId: {id: 0},
      Motivo: '',
    },
    validationSchema: Yup.object().shape({
        VotadoEmpleadoId: Yup.object().shape({
        id: Yup.number().integer().notOneOf([0], 'Debe seleccionar un empleado').required('Debe seleccionar un empleado')
      }),
      CategoriaId: Yup.object().shape({
        id: Yup.number().integer().notOneOf([0], 'Debe seleccionar una categoría').required('Debe seleccionar una categoría')
      }),
      Motivo: Yup.string().required('Debe ingresar motivo'),
    }),
    onSubmit: (values) => {
      add({CategoriaId:values.CategoriaId.id, VotadoEmpleadoId: values.VotadoEmpleadoId.id, VotanteEmpleadoId: values.VotanteEmpleadoId, Motivo:values.Motivo});
    }
  });

  useEffect(() => {
    if (isVotarSuccess) {
      toast.success('Se registro voto con exito' );
      formik.resetForm();
      history.push(Routes.Dashboard.path);
      
    }
  }, [isVotarSuccess, votarData]);

  useEffect(() => {
    if (isVotarError) {
      formik.setErrors(votarError.data);

      toast.error([].concat(...Object.values(JSON.parse(votarError.data).Messages)));
    }
  }, [isVotarError, votarError]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Section>
        <SectionHeader className="d-flex align-items-center">
          <SectionTitle className="flex-fill">
            <TranslatableText  entry="Votar" />
          </SectionTitle>
          <Button type="submit" className="ms-2">
            <TranslatableText  entry="Votar" />
          </Button>
        </SectionHeader>
        <SectionBody>
          <Row>
            <Col sm={12} lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <TranslatableText  entry="Categoría" />*
                </Form.Label>
                <Form.Select {...formik.getFieldProps('CategoriaId.id')} isInvalid={!!formik.errors.CategoriaId?.id}>
                  <option value="0"></option>
                  {categorias.map((categoria) => (<option key={categoria.Id} value={`${categoria.Id}`}>{categoria.Nombre}</option>))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{formik.errors.CategoriaId?.id}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={12} lg={6}>
            <Form.Group className="mb-3">
                <Form.Label>
                  <TranslatableText  entry="Empleado" />*
                </Form.Label>
                <Form.Select {...formik.getFieldProps('VotadoEmpleadoId.id')} isInvalid={!!formik.errors.VotadoEmpleadoId?.id}>
                  <option value="0"></option>
                  {empleados.map((Empleado) => (<option key={Empleado.Id} value={`${Empleado.Id}`}>{Empleado.Description}</option>))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{formik.errors.VotadoEmpleadoId?.id}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col sm={12} md={12}>
            <Form.Group className="mb-3">
              <Form.Label>
                <TranslatableText  entry="Motivo" />*
              </Form.Label>
              <Form.Control type="text"  {...formik.getFieldProps('Motivo')} isInvalid={!!formik.errors.Motivo && formik.touched.Motivo} />
              <Form.Control.Feedback type="invalid">{formik.errors.Motivo}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          </Row>
    
        </SectionBody>
      </Section>
    </Form>
  );
};