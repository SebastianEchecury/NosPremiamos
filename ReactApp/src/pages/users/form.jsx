import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Col, Form, Row } from '@themesberg/react-bootstrap';
import toast from 'react-hot-toast';

import { TranslatableText } from '../../components/translations';
import { useGetListQuery as useGetRolesQuery } from '../../redux/apis/roles';
import {useAddMutation as useAddEmpleadoRolMutation} from '../../redux/apis/user-roles'
import { useAddMutation, useGetQuery as useGetUserQuery, useUpdateMutation } from '../../redux/apis/users';

export default function UserForm({ Id, disabled = false }) {
  const history = useHistory();
  const [add, { isSuccess: isAddSuccess, data: addData, isError: isAddError, error: addError }] = useAddMutation();
  const [addEmpleadoRol, { isSuccess: isAddEmpleadoRolSuccess, data: addEmpleadoRolData, isError: isAddEmpleadoRolError, error: addEmpleadoRolError }] = useAddEmpleadoRolMutation();
  const [update, { isSuccess: isUpdateSuccess, data: updateData, isError: isUpdateError, error: updateError }] = useUpdateMutation();
  const { data: roles = [] } = useGetRolesQuery();
  const { data: { Nombre, Apellido, Usuario, EmpleadosRoles } = {} } = useGetUserQuery(Id, { skip: !!!Id });
  const {er, setEr} = useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Id: Id,
      Nombre: Nombre || '',
      Apellido: Apellido || '',
      Usuario: Usuario || '',
      UsuarioRoles: (EmpleadosRoles || []).map((Id) => `${Id.RolId}`),
    },
    validationSchema: Yup.object().shape({
      Usuario: Yup.string().email('Debe ingresar un correo electrónico válido').required('Debe ingresar Email'),
      Nombre: Yup.string().required('Debe ingresar Nombre'),
      Apellido: Yup.string().required( 'Debe ingresar Apellido'),   
    }),
    onSubmit: (values) => {
      if (Id) {
        return update(values);
      }
      else {
        formik.setFieldValue('Id',0);
        return add(values);
      }
    }
  });

  const onCancelClick = () => {
    history.goBack();
  };

  const getCheckProps = (role, name) => {
    return ({
      ...formik.getFieldProps(name),
      label: role.Nombre,
      value: `${role.Id}`,
      checked: formik.values.UsuarioRoles.includes(`${role.Id}`),      
    })
  };

  useEffect(() => {
    if (isAddSuccess) {
      toast.success("Asociado se registro con exito");
      history.goBack();
    }
    else if (isUpdateSuccess) {
      toast.success(updateData.message);
      history.goBack();
    }
  }, [isAddSuccess, addData, isUpdateSuccess, updateData]);

  useEffect(() => {
    if (isAddError) {
      toast.error([].concat(...Object.values(addError.data)));
      formik.setErrors({ ...addError.data, email: addError.data.email || addError.data.userName });
    }
    else if (isUpdateError) {
      toast.error([].concat(...Object.values(updateError.data)));
      formik.setErrors({ ...updateError.data, email: updateError.data.email || updateError.data.userName });
    }
  }, [isAddError, addError, isUpdateError, updateError]);

  return (
    <Form onSubmit={formik.handleSubmit} className="pt-4">
      <Card >
        <Card.Header>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <div className="d-block mb-4 mb-md-0">
              <h4>Empleado</h4>
            </div>
            <div className="d-block mb-4 mb-md-0">
              <Button type="button" variant="outline-primary" onClick={onCancelClick}>
                <TranslatableText  entry="Cancelar" />
              </Button>
              <Button type="submit" className="ms-2" hidden={disabled}>
                <TranslatableText  entry="Guardar" />
              </Button>
              <Button type="submit" className="ms-2" hidden={!disabled}>
                <TranslatableText  entry="Activar" />
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <TranslatableText  entry="Usuario" />
                </Form.Label>
                <Form.Control type="email" {...formik.getFieldProps('Usuario')} isInvalid={!!formik.errors.Usuario} disabled={disabled || !!Id} />
                <Form.Control.Feedback type="invalid">{formik.errors.Usuario}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <TranslatableText  entry="Nombre" />
                </Form.Label>
                <Form.Control type="text"  {...formik.getFieldProps('Nombre')} isInvalid={!!formik.errors.Nombre} disabled={disabled} />
                <Form.Control.Feedback type="invalid">{formik.errors.Nombre}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <TranslatableText  entry="Apellido" />
                </Form.Label>
                <Form.Control type="text"  {...formik.getFieldProps('Apellido')} isInvalid={!!formik.errors.Apellido} disabled={disabled} />
                <Form.Control.Feedback type="invalid">{formik.errors.Apellido}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>
              <TranslatableText  entry="Roles" />
            </Form.Label>            
            {roles.data?.map((role) => (<Form.Check key={role.id} type="checkbox" {...getCheckProps(role, 'UsuarioRoles')} />))}
          </Form.Group>
        </Card.Body>
      </Card>
    </Form>
  );
};