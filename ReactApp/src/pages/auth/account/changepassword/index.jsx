import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button, FormCheck, Container } from '@themesberg/react-bootstrap';
import { TranslatableText, useTranslations } from "../../../../components/translations";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useResetPasswordMutation } from '../../../../redux/apis/auth';
import { Routes } from './../../../../routes';
import { translationsGroupNames } from '../../../../utils/translationsGroupNames';
import {useGetQuery as userGetIdUser } from '../../../../redux/apis/users'

export default   ({userId, resetCode}) => {
    const history = useHistory();
    const { translations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['ConfirmPassword', 'Password'] });
    const { translations: genericTranslations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['ConfirmPassword','Password'] });
    const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired', 'InvalidFormat', 'PasswordsMustMatch'] });
    const {data: user = {}} = userGetIdUser(userId);
    const isRegister = (user.isActive && user.emailConfirmed)? true: false;

  const [resetPassword, { isSuccess: isResetPasswordSuccess, isError: isResetPasswordError, data: resetPasswordData, error: resetPasswordError }] = useResetPasswordMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      confirmpassword: '',
      password: '',
      id: userId,
      passwordResetCode: resetCode,
      errorResetPassword: ''
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required(errorsTranslations.FieldRequired.replace('{0}',genericTranslations.Password)),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], errorsTranslations.PasswordsMustMatch.replace('{0}',genericTranslations.ConfirmPasswords))
        .required(errorsTranslations.FieldRequired.replace('{0}',genericTranslations.Password))

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
            formik.setErrors({password: resetPasswordError.data.password? [].concat(...Object.values(resetPasswordError.data.password).join('. ')): '' , errorResetPassword: resetPasswordError.data.passwordResetCode? resetPasswordError.data.passwordResetCode: '' });
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
                            <div className="text-center text-md-center mb-4 mt-md-0" hidden={!isRegister}>
                            <h3 className="mb-0">
                                <TranslatableText group={translationsGroupNames.Generic} entry="ChangePassword" />
                            </h3>
                            </div>
                            <div className="text-center text-md-center mb-4 mt-md-0" hidden={isRegister}>
                            <h3 className="mb-0">
                                <TranslatableText group={translationsGroupNames.Generic}  entry="SetUpUser" />
                            </h3>
                            </div>
                            <Form className="mt-4" onSubmit={formik.handleSubmit}>
                            <Form.Group>
                                <Form.Group id="password" className="mb-4">
                                <Form.Label>
                                    <TranslatableText group={translationsGroupNames.Generic} entry="YourPassword" />
                                </Form.Label>                      
                                    <Form.Control
                                    type="password"
                                    {...formik.getFieldProps('password')}
                                    isInvalid={!!formik.errors.password}
                                    placeholder={translations.Password}
                                />                        
                                <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group id="confirmpassword" className="mb-4">
                                <Form.Label>
                                    <TranslatableText group={translationsGroupNames.Generic} entry="ConfirmPassword" />
                                </Form.Label>                      
                                    <Form.Control
                                    type="password"
                                    {...formik.getFieldProps('confirmpassword')}
                                    isInvalid={!!formik.errors.confirmpassword}
                                    placeholder={translations.ConfirmPassword}
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
                                <Button type="submit" variant="primary" hidden={!isRegister} className="w-100">
                                    <TranslatableText group={translationsGroupNames.Generic}  entry="ConfirmChange" />
                                </Button> 
                                <Button type="submit" variant="primary" hidden={isRegister} className="w-100">
                                    <TranslatableText group={translationsGroupNames.Generic}  entry="RegisterUser" />
                                </Button> 
                                <br/>
                                <br/>
                                <Button variant="primary" onClick={onCancelClick} className="w-100">
                                    <TranslatableText group={translationsGroupNames.Generic} entry="Cancel" />
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
