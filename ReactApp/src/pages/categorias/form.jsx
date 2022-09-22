import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Col, Form, Row } from '@themesberg/react-bootstrap';
import toast from 'react-hot-toast';

import { TranslatableText } from '../../components/translations';
import { useAddMutation, useGetQuery as useGetUserQuery, useUpdateMutation } from '../../redux/apis/categorias';
import { Section, SectionBody, SectionHeader, SectionTitle } from '../../components/section';

import EmpleadosRepresentantes from './empleadocategoria';

export default function UserForm({ Id, disabled = false }) {
  const history = useHistory();
  const [add, { isSuccess: isAddSuccess, data: addData, isError: isAddError, error: addError }] = useAddMutation();
  const [update, { isSuccess: isUpdateSuccess, data: updateData, isError: isUpdateError, error: updateError }] = useUpdateMutation();
  const { data: { Nombre, Descripcion, RequiereAprobacion, IncluyeNovedades, CantidadVotos, EstadoId } = {} } = useGetUserQuery(Id, { skip: !!!Id });
  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Id: Id,
      Nombre: Nombre || '',
      Descripcion: Descripcion || '',
      RequiereAprobacion: RequiereAprobacion || '',
      IncluyeNovedades: IncluyeNovedades || '',
      CantidadVotos: CantidadVotos || '',
      EstadoId: EstadoId || '',
    },
    validationSchema: Yup.object().shape({
      Nombre: Yup.string().required('Debe ingresar nombre'),
      Descripcion: Yup.string().required('Debe ingresar descripción'),
      CantidadVotos: Yup.string().required( 'Debe ingresar cantidad de votos'),
      RequiereAprobacion: Yup.string().required('Debe ingresar si se requiere aprobación'),  
      IncluyeNovedades: Yup.string().required('Debe ingresar si incluye novedades'),  
    }),
    onSubmit: (values) => {
      if (Id) {
        return update(values);
      }
      else {
        formik.setFieldValue('Id',0);
        return add({Descripcion: formik.values.Descripcion, Nombre: formik.values.Nombre, CantidadVotos: formik.values.CantidadVotos, IncluyeNovedades: formik.values.IncluyeNovedades== 1? true:false, RequiereAprobacion: formik.values.RequiereAprobacion==1? 1: 2, EstadoId: 1 });
      }
    }
  });

  const onCancelClick = () => {
    history.goBack();
  };

  useEffect(()=>{
    if(IncluyeNovedades){
      formik.setFieldValue("IncluyeNovedades", 1)
    }
    if(!IncluyeNovedades){
        formik.setFieldValue("IncluyeNovedades", 2)
    }
  }, [IncluyeNovedades])

  useEffect(()=>{
    if(RequiereAprobacion){
      formik.setFieldValue("RequiereAprobacion", 1)
    }
    if(!RequiereAprobacion){
        formik.setFieldValue("RequiereAprobacion", 2)
    }
  }, [RequiereAprobacion])
  
  useEffect(() => {
    if (isAddSuccess) {
      toast.success("Categoria se registro con exito");
      history.goBack();
    }
    else if (isUpdateSuccess) {
      toast.success("Categoria se edito con exito");
      history.goBack();
    }
  }, [isAddSuccess, addData, isUpdateSuccess, updateData]);

  useEffect(() => {
    if (isAddError) {
      toast.error([].concat(...Object.values(JSON.parse(addError.data).Messages)));
      formik.setErrors({ ...addError.data, email: addError.data.email || addError.data.userName });
    }
    else if (isUpdateError) {
      toast.error([].concat(...Object.values(JSON.parse(updateError.data).Messages)));
      formik.setErrors({ ...updateError.data, email: updateError.data.email || updateError.data.userName });
    }
  }, [isAddError, addError, isUpdateError, updateError]);

  return (
    <Form onSubmit={formik.handleSubmit} className="pt-4">
    <Section>
      <SectionHeader className="d-flex align-items-center">
        <SectionTitle className="flex-fill">
          <TranslatableText  entry="Categoría" />
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
                <TranslatableText  entry="Nombre" />*
              </Form.Label>
              <Form.Control type="text" {...formik.getFieldProps('Nombre')} isInvalid={!!formik.errors.Nombre && formik.touched.Nombre} disabled={disabled || !!Id} />
              <Form.Control.Feedback type="invalid">{formik.errors.Nombre}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                <TranslatableText  entry="Descripción" />*
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
                <TranslatableText  entry="Cantidad de Votos" />*
              </Form.Label>
              <Form.Control type="number"  {...formik.getFieldProps('CantidadVotos')} isInvalid={!!formik.errors.CantidadVotos && formik.touched.CantidadVotos} disabled={disabled} />
              <Form.Control.Feedback type="invalid">{formik.errors.CantidadVotos}</Form.Control.Feedback>
            </Form.Group>
          </Col> 
          <Col sm={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                <TranslatableText entry="Incluye Novedades" />*
              </Form.Label>
              <Form.Select {...formik.getFieldProps('IncluyeNovedades')} isInvalid={!!formik.errors.IncluyeNovedades && formik.touched.IncluyeNovedades} disabled={disabled}>
                <option value="0"></option>
                <option value="1">Si</option>
                <option value="2">No</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formik.errors.IncluyeNovedades}</Form.Control.Feedback>
            </Form.Group>
          </Col>          
        </Row>
        <Row>
        <Col sm={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                <TranslatableText entry="Requiere Aprobación" />*
              </Form.Label>
              <Form.Select {...formik.getFieldProps('RequiereAprobacion')} isInvalid={!!formik.errors.RequiereAprobacion && formik.touched.RequiereAprobacion} disabled={disabled}>
                <option value="0"></option>
                <option value="1">Si</option>
                <option value="2">No</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formik.errors.RequiereAprobacion}</Form.Control.Feedback>
            </Form.Group>
          </Col>      
        </Row>
        <br/> 
        {formik.values.RequiereAprobacion == 1 && <EmpleadosRepresentantes filter={{categoriaId: Id? Id:0 }}></EmpleadosRepresentantes>}
        </SectionBody>
    </Section>    
  </Form>
  );
};