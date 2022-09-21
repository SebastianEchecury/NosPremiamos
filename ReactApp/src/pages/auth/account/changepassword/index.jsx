import React, { useEffect } from 'react';
import { Form, Button, Image, Container } from '@themesberg/react-bootstrap';
import { TranslatableText } from "../../../../components/translations";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useResetPasswordMutation } from '../../../../redux/apis/auth';
import { Routes } from './../../../../routes';
import { Section, SectionTitle } from '../../../../components/section';
import Logo from '../../../../assets/images/logo.png';

export default   () => {
    const history = useHistory();
  
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
        <Section className="auth p-5 rounded-5">
        <Container fluid className="text-center">
        <Image fluid src={Logo} className="mb-3" />
         </Container>
        <SectionTitle className="text-center mb-3">
          <TranslatableText entry="Cambio de Contraseña" />
        </SectionTitle>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
          <Form.Group id="password" className="mb-3">
              <Form.Label>
                <TranslatableText  entry="Contraseña" />*
              </Form.Label>
              <Form.Control type="password" placeholder='Ingrese su contraseña' {...formik.getFieldProps('password')} isInvalid={!!formik.errors.password} />
              <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
           </Form.Group>  
            <Form.Group id="passwordnew" className="mb-3">
              <Form.Label>
                <TranslatableText entry="Nueva Contraseña" />*
              </Form.Label>
              <Form.Control type="password" placeholder='Ingrese su nueva contraseña' {...formik.getFieldProps('passwordnueva')} isInvalid={!!formik.errors.passwordnueva} />
              <Form.Control.Feedback type="invalid">{formik.errors.passwordnueva}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group id="confirmpassword" className="mb-3">
              <Form.Label>
                <TranslatableText entry="Confirmar Contraseña" />*
              </Form.Label>
              <Form.Control type="password" placeholder='Confirma tu nueva contraseña' {...formik.getFieldProps('confirmpassword')} isInvalid={!!formik.errors.confirmpassword} />
              <Form.Control.Feedback type="invalid">{formik.errors.confirmpassword}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group id="errorResetPassword" className="mb-3 invalid">
              <Form.Control hidden={true} type="invalid"{...formik.getFieldProps('errorResetPassword')} isInvalid={!!formik.errors.errorResetPassword} />
              <Form.Control.Feedback type="invalid">{formik.errors.errorResetPassword}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="d-grid">
              <Button type="submit" variant="primary">
                <TranslatableText entry="Restableser Contraseña" />
              </Button>
            </Form.Group>
             <Form.Group className="mt-3 d-grid">
              <Button variant="outline-primary" onClick={onCancelClick}>
                <TranslatableText  entry="Cancelar" />
              </Button>
            </Form.Group>
          </Form.Group>
        </Form>
      </Section>
    );
}
