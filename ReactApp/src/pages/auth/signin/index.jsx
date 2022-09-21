import React, { useEffect } from "react";
import { Col, Row, Form, Card, Button, FormCheck, Container, Image } from '@themesberg/react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useLoginMutation } from "../../../redux/apis/auth";
import { TranslatableText } from "../../../components/translations";
import { Routes } from "../../../routes";
import { useSelector } from "react-redux";
import { Section } from "../../../components/section";

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Logo from '../../../assets/images/logo.png';

let Signin = (props) => {
  const history = useHistory();

  const [login, { isSuccess: isLoginSuccess, isError: isLoginError, data: loginData, error: loginError }] = useLoginMutation();
  const token = useSelector((state) => state.auth.token);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      password: '',
      errorUserPassword: ''
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required('Debe ingresar Contraseña'),
      email: Yup.string().email('Debe ingresar un correo electrónico válido').required('Debe ingresar Correo'),
    }),
    onSubmit: (values) => {
      login(values);
    },
  });

  useEffect(() => {
    if (isLoginSuccess) {    
      localStorage.setItem('usuario', JSON.stringify(loginData));
      const primerIngreso =  JSON.parse(localStorage.getItem('usuario')).primerIngreso;
      if(!primerIngreso){
        history.push(Routes.AccountChangePassword.path);
      }
      else{
      history.push(Routes.Dashboard.path);
      }
    }
  }, [token]);

  useEffect(() => {
    if (isLoginError) {
      formik.setErrors({ errorUserPassword: [].concat(...Object.values(JSON.parse(loginError.data).Messages)) });
    }
  }, [isLoginError, loginError]);

  return (
    <Section className="auth p-5 rounded-5">
    <Container fluid className="text-center">
      <Image fluid src={Logo} className="mb-3" />
    </Container>
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>
          <TranslatableText entry="Correo" />*
        </Form.Label>
        <Form.Control type="email" {...formik.getFieldProps('email')} isInvalid={!!formik.errors.email} placeholder="Email" />
        <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <TranslatableText  entry="Contraseña" />*
        </Form.Label>
        <Form.Control type="password" {...formik.getFieldProps('password')} isInvalid={!!formik.errors.password} placeholder="Contraseña" />
        <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3 d-block">
        <Form.Control hidden={true} type="invalid" {...formik.getFieldProps('errorUserPassword')} isInvalid={!!formik.errors.errorUserPassword} />
        <Form.Control.Feedback type="invalid">{formik.errors.errorUserPassword}</Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group className="mb-3 d-grid">
        <Button variant="primary" type="submit">
          <TranslatableText  entry="Ingresar" />
        </Button>
      </Form.Group>      
    </Form>
  </Section>
);
   
};

export default Signin;