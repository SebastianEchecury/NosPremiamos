import React, { useEffect } from "react";
import { Col, Row, Form, Card, Button, FormCheck, Container, Image } from '@themesberg/react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useLoginMutation } from "../../../redux/apis/auth";
import { TranslatableText, useTranslations } from "../../../components/translations";
import { Routes } from "../../../routes";
import { useSelector } from "react-redux";

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
    if (token) {
      history.push(Routes.Dashboard.path);
    }
  }, [token, history]);

  useEffect(() => {
    if (isLoginError) {
      formik.setErrors({ errorUserPassword: [].concat(...Object.values(JSON.parse(loginError.data).Messages)) });
    }
  }, [isLoginError, loginError]);

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image" >
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <Image src={Logo} />
                </div>
                <Form className="mt-4" onSubmit={formik.handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>
                      <TranslatableText entry="Correo" />
                    </Form.Label>
                    <Form.Control
                      {...formik.getFieldProps('email')}
                      isInvalid={!!formik.errors.email}
                      placeholder='Correo'
                      type="email"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>
                        <TranslatableText  entry="Contraseña" />
                      </Form.Label>
                      <Form.Control
                        type="password"
                        {...formik.getFieldProps('password')}
                        isInvalid={!!formik.errors.password}
                        placeholder='Contraseña'
                      />
                      <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                    </Form.Group>                    
                  </Form.Group>
                  <Form.Group id="errorUserPassword" className="mb-4 invalid">
                    <Form.Control hidden={true}
                      type="invalid"
                      {...formik.getFieldProps('errorUserPassword')}
                      isInvalid={!!formik.errors.errorUserPassword}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.errorUserPassword}</Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    <TranslatableText  entry="Ingresar" />
                  </Button>
                </Form>                
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Signin;