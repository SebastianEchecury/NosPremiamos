import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Col, Form, Row } from '@themesberg/react-bootstrap';
import toast from 'react-hot-toast';

import { TranslatableText, useTranslations } from '../../../components/translations';
import { useGetItemsQuery as useGetPermissionQuery } from '../../../redux/apis/permissions';
import { useAddMutation, useGetQuery as useGetUserQuery, useUpdateMutation } from '../../../redux/apis/roles';
import { translationsGroupNames } from "../../../utils/translationsGroupNames";
import PermissionCheck from './permission-check';

export default function RoleForm({ id, disabled = false }) {
  const history = useHistory();
  const [add, { isSuccess: isAddSuccess, data: addData, isError: isAddError, error: addError }] = useAddMutation();
  const [update, { isSuccess: isUpdateSuccess, data: updateData, isError: isUpdateError, error: updateError }] = useUpdateMutation();
  const { translations: genericTranslations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['Name', 'Description', 'Save', 'Cancel'] });
  const { translations: rolesTranslations } = useTranslations({ group: translationsGroupNames.Roles, keys: ['Role'] });
  const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired', 'InvalidFormat'] });
  const { data: permissionsList = [] } = useGetPermissionQuery({ order: [{ token: 'asc' }] });
  const { data: { name, description, permissions } = {} } = useGetUserQuery(id);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id,
      name: name || '',
      description: description || '',
      permissions: (permissions || []).map((id) => `${id}`)
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.Name))
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

  const getCheckProps = (permission, name) => {
    return ({
      ...formik.getFieldProps(name),
      value: `${permission.id}`,
      checked: formik.values.permissions.includes(`${permission.id}`)
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
      formik.setErrors(addError.data);
    }
    else if (isUpdateError) {
      toast.error([].concat(...Object.values(updateError.data)));
      formik.setErrors(updateError.data);
    }
  }, [isAddError, addError, isUpdateError, updateError]);

  return (
    <Form onSubmit={formik.handleSubmit} className="pt-4">
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <div className="d-block mb-4 mb-md-0">
              <h4>{rolesTranslations.Role}</h4>
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
                  <TranslatableText group={translationsGroupNames.Generic} entry="Name" />
                </Form.Label>
                <Form.Control autoFocus type="name" {...formik.getFieldProps('name')} isInvalid={!!formik.errors.name} disabled={disabled} />
                <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <TranslatableText group={translationsGroupNames.Generic} entry="Description" />
                </Form.Label>
                <Form.Control type="text"  {...formik.getFieldProps('description')} isInvalid={!!formik.errors.description} disabled={disabled} />
                <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Form.Group className="mb-3">
              <Form.Label>
                <TranslatableText group={translationsGroupNames.Generic} entry="Permissions" />
              </Form.Label>
              {permissionsList.map((permission) => (<PermissionCheck key={permission.id} type="checkbox" permission={permission} {...getCheckProps(permission, 'permissions')} disabled={disabled} />))}
            </Form.Group>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
};