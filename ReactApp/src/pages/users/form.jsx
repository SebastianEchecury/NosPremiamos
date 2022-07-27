import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Col, Form, Row } from '@themesberg/react-bootstrap';
import toast from 'react-hot-toast';

import { TranslatableText, useTranslations } from '../../components/translations';
import { useGetItemsQuery as useGetRolesQuery } from '../../redux/apis/roles';
import { useGetListQuery as useGetUserTypesQuery } from '../../redux/apis/user-types';
import { useGetListQuery as useGetTerminalQuery } from '../../redux/apis/terminales';
import { useAddMutation, useGetQuery as useGetUserQuery, useUpdateMutation } from '../../redux/apis/users';
import { translationsGroupNames } from '../../utils/translationsGroupNames';

export default function UserForm({ id, disabled = false }) {
  const history = useHistory();
  const [add, { isSuccess: isAddSuccess, data: addData, isError: isAddError, error: addError }] = useAddMutation();
  const [update, { isSuccess: isUpdateSuccess, data: updateData, isError: isUpdateError, error: updateError }] = useUpdateMutation();
  const { translations: genericTranslations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['Email', 'FirstName', 'LastName', 'UserType', 'Terminal'] });
  const { translations: usersTranslations } = useTranslations({ group: translationsGroupNames.Users, keys: ['User'] });
  const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired', 'InvalidFormat'] });
  const { data: { data: userTypes = [] } = {} } = useGetUserTypesQuery();
  const { data: { data: terminales = [] } = {} } = useGetTerminalQuery();
  const { data: roles = [] } = useGetRolesQuery();
  const { data: { firstName, lastName, email, userType, terminal, userRoles } = {} } = useGetUserQuery(id, { skip: !!!id });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id,
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      userType: { id: `${userType?.id || 0}` },
      terminal: { id: `${terminal?.id || 0}` },
      userRoles: (userRoles || []).map((id) => `${id}`),
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email(errorsTranslations.InvalidFormat.replace('{0}', genericTranslations.Email)).required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.Email)),
      firstName: Yup.string().required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.FirstName)),
      lastName: Yup.string().required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.LastName)),
      userType: Yup.object().shape({
        id: Yup.number().integer().notOneOf([0], errorsTranslations.FieldRequired.replace('{0}', genericTranslations.UserType)).required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.UserType))
      }),
      terminal: Yup.object().when('userType', {
        is: (userType) => {
          return userType.id === -2;
        },
        then: Yup.object().shape({
          id: Yup.number().integer().notOneOf([0], errorsTranslations.FieldRequired.replace('{0}', genericTranslations.Terminal)).required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.Terminal))
        }),
        otherwise: Yup.object().shape({
          id: Yup.number().integer()
        })
      })
    }),
    onSubmit: (values) => {
      if (id) {
        return update(values);
      }
      else {
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
      label: role.description,
      value: `${role.id}`,
      checked: formik.values.userRoles.includes(`${role.id}`),
      disabled: disabled || userTypes.some((type) => `${type.id}` === `${formik.values.userType?.id}` && type.role?.id === role.id)
    })
  };

  useEffect(() => {
    if (isAddSuccess) {
      toast.success(addData.message);
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

  useEffect(() => {
    if (userTypes.length) {
      const type = userTypes.find((type) => `${type.id}` === formik.values.userType.id)
      if (type?.role?.id) {
        formik.setFieldValue('userRoles', [`${type.role.id}`], false);
      }
      else {
        formik.setFieldValue('userRoles', [], false);
      }
    }
  }, [formik.values.userType.id, userTypes]);

  return (
    <Form onSubmit={formik.handleSubmit} className="pt-4">
      <Card >
        <Card.Header>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <div className="d-block mb-4 mb-md-0">
              <h4>{usersTranslations.User}</h4>
            </div>
            <div className="d-block mb-4 mb-md-0">
              <Button type="button" variant="outline-primary" onClick={onCancelClick}>
                <TranslatableText group={translationsGroupNames.Generic} entry="Cancel" />
              </Button>
              <Button type="submit" className="ms-2" hidden={disabled}>
                <TranslatableText group={translationsGroupNames.Generic} entry="Save" />
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <TranslatableText group={translationsGroupNames.Generic} entry="Email" />
                </Form.Label>
                <Form.Control type="email" {...formik.getFieldProps('email')} isInvalid={!!formik.errors.email} disabled={disabled || !!id} />
                <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <TranslatableText group={translationsGroupNames.Generic} entry="FirstName" />
                </Form.Label>
                <Form.Control type="text"  {...formik.getFieldProps('firstName')} isInvalid={!!formik.errors.firstName} disabled={disabled} />
                <Form.Control.Feedback type="invalid">{formik.errors.firstName}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <TranslatableText group={translationsGroupNames.Generic} entry="LastName" />
                </Form.Label>
                <Form.Control type="text"  {...formik.getFieldProps('lastName')} isInvalid={!!formik.errors.lastName} disabled={disabled} />
                <Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <TranslatableText group={translationsGroupNames.Generic} entry="UserType" />
                </Form.Label>
                <Form.Select {...formik.getFieldProps('userType.id')} isInvalid={!!formik.errors.userType?.id} disabled={disabled}>
                  <option value="0"></option>
                  {userTypes.map((type) => (<option key={type.id} value={`${type.id}`}>{type.name}</option>))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{formik.errors.userType?.id}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row hidden={formik.values.userType.id !== '-2'}>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <TranslatableText group={translationsGroupNames.Generic} entry="Terminal" />
                </Form.Label>
                <Form.Select {...formik.getFieldProps('terminal.id')} isInvalid={!!formik.errors.terminal?.id} disabled={disabled}>
                  <option value="0"></option>
                  {terminales.map((terminal) => (<option key={terminal.id} value={`${terminal.id}`}>{terminal.nombre}</option>))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{formik.errors.terminal?.id}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>
              <TranslatableText group={translationsGroupNames.Generic} entry="Roles" />
            </Form.Label>
            {roles.map((role) => (<Form.Check key={role.id} type="checkbox" {...getCheckProps(role, 'userRoles')} />))}
          </Form.Group>
        </Card.Body>
      </Card>
    </Form>
  );
};