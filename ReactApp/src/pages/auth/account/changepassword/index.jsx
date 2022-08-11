import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button, FormCheck, Container } from '@themesberg/react-bootstrap';
import { TranslatableText, useTranslations } from "../../../../components/translations";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useResetPasswordMutation } from '../../../../redux/apis/auth';
import { Routes } from './../../../../routes';
import { translationsGroupNames } from '../../../../utils/translationsGroupNames';

export default   () => {
    const history = useHistory();
    const { translations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['ConfirmPassword', 'Password'] });
  
  const [resetPassword, { isSuccess: isResetPasswordSuccess, isError: isResetPasswordError, data: resetPasswordData, error: resetPasswordError }] = useResetPasswordMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      confirmpassword: '',
      password: '',
      passwordnueva: '',
      errorResetPassword: ''
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required('Debe ingresar Contraseña'),
      passwordnueva: Yup.string().required('Debe ingresar Contraseña'),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref('passwordnueva'), null], 'Las contraseñas deben ser iguales')
        .required('Debe confirmar Contraseña')

    }),
    onSubmit: (values) => {
      resetPassword(values);
    },
  });

    useEffect(() => {
        if (isResetPasswordSuccess) {
          history.push(Routes.AccountChangePassword.SuccessPassword.path);
        }
        else if (isResetPasswordError) {
            formik.setErrors({ errorResetPassword: [].concat(...Object.values(JSON.parse(resetPasswordError.data).Messages)) });
        }
      }, [isResetPasswordSuccess, resetPasswordData, isResetPasswordError, resetPasswordError, history]);
     
      const onCancelClick = () => {
        history.goBack();
    };
    
    return (
        <main>
        <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
            <Container>
                <Row className="justify-content-center form-bg-image" >
                    <Col xs={12} className="d-flex align-items-center justify-content-center">
                        <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <div className="text-center text-md-center mb-4 mt-md-0">
                            <h3 className="mb-0">
                                <TranslatableText entry="Cambio de Contraseña" />
                            </h3>
                            </div>
                            <Form className="mt-4" onSubmit={formik.handleSubmit}>
                            
                            <Form.Group>
                            <Form.Group id="password" className="mb-4">
                                <Form.Label>
                                    <TranslatableText  entry="Contraseña" />
                                </Form.Label>                      
                                    <Form.Control
                                    type="password"
                                    {...formik.getFieldProps('password')}
                                    isInvalid={!!formik.errors.password}
                                    placeholder='Ingrese su contraseña'
                                />                        
                                <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                            </Form.Group>
                                <Form.Group id="passwordnew" className="mb-4">
                                <Form.Label>
                                    <TranslatableText  entry="Nueva Contraseña" />
                                </Form.Label>                      
                                    <Form.Control
                                    type="password"
                                    {...formik.getFieldProps('passwordnueva')}
                                    isInvalid={!!formik.errors.passwordnueva}
                                    placeholder='Ingrese su nueva contraseña'
                                />                        
                                <Form.Control.Feedback type="invalid">{formik.errors.passwordnueva}</Form.Control.Feedback>
                            </Form.Group>
                                <Form.Group id="confirmpassword" className="mb-4">
                                <Form.Label>
                                    <TranslatableText entry="Confirmar Contraseña" />
                                </Form.Label>                      
                                    <Form.Control
                                    type="password"
                                    {...formik.getFieldProps('confirmpassword')}
                                    isInvalid={!!formik.errors.confirmpassword}
                                    placeholder='Confirma tu nueva contraseña'
                                />                        
                                <Form.Control.Feedback type="invalid">{formik.errors.confirmpassword}</Form.Control.Feedback>
                                </Form.Group> 

                                <Form.Group id="errorResetPassword" className="mb-4 invalid">    
                                <Form.Control hidden={true}
                                    type="invalid"
                                    {...formik.getFieldProps('errorResetPassword')}
                                    isInvalid={!!formik.errors.errorResetPassword}
                                />                  
                                   <Form.Control.Feedback type="invalid">{formik.errors.errorResetPassword}</Form.Control.Feedback>
                                </Form.Group>                            
                                <Button type="submit" variant="primary" className="w-100">
                                    <TranslatableText   entry="Restableser Contraseña" />
                                </Button> 
                                <br/>
                                <br/>
                                <Button variant="primary" onClick={onCancelClick} className="w-100">
                                    <TranslatableText entry="Cancelar" />
                                </Button>
                            </Form.Group>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </main>
  );
}
