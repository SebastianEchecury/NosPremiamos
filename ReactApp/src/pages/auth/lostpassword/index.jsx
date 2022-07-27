import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button,Container } from '@themesberg/react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useLostPasswordMutation } from "../../../redux/apis/auth";
import { TranslatableText, useTranslations } from "../../../components/translations";
import { Routes } from "../../../routes";
import { useSelector } from "react-redux";
import { ReCaptcha } from 'react-recaptcha-google';
import { apiUrl } from '../../../utils/apiUrl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { translationsGroupNames } from "../../../utils/translationsGroupNames";

let LostPassword = (props) => {
  const history = useHistory();
  const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired', 'InvalidFormat'] });
  const { translations: genericTranslations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['Email','Password'] });
  const [passwordLost,  { isSuccess: isLostPasswordSuccess, data: lostPasswordData, isError: isLostPasswordError, error: lostPasswordError }] = useLostPasswordMutation();
  const token = useSelector((state) => state.auth.token);
  const [isReCaptchaValid, setisReCaptchaValid] = useState(false)
  
  
  useEffect(() => {
    if (isLostPasswordSuccess) {
      history.push(Routes.LostPassword.VerifyEmail.path);
      history.replace(Routes.LostPassword.VerifyEmail.path);
    }
    else if (isLostPasswordError) {
      const errors = [].concat(...Object.values(lostPasswordError.data));
      toast.error(errors);
    }
  }, [isLostPasswordSuccess, lostPasswordData, isLostPasswordError, lostPasswordError, history]);
  
  let captchaDemo = '';

  const onLoadRecaptcha = () => {
      if (captchaDemo) {
          captchaDemo.reset();
      }
  }

  const verifyCallback = (recaptchaToken) => {
      setisReCaptchaValid(true)
  }

  const onExpiredRecaptcha = (response) => {    
    if (response == undefined){      
      setisReCaptchaValid(false)
    }    
  } 

  useEffect(() => {
      console.log(apiUrl.RecaptchaURL);
      if (captchaDemo) {
          captchaDemo.reset();
      }
  }, [])

  const onCancelClick = () => {
    history.goBack();
};
  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      Recaptcha: false,
    },
    validationSchema: Yup.object().shape({       
        email: Yup.string().email(errorsTranslations.InvalidFormat.replace('{0}', genericTranslations.Email)).required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.Email)),
        Recaptcha: Yup.boolean().oneOf([!isReCaptchaValid], errorsTranslations.FieldRequired.replace('{0}', genericTranslations.Recaptcha)),
        }),
        onSubmit : (values) => {
          passwordLost(values);          
        },
});


  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image" >
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">
                    <TranslatableText group={translationsGroupNames.Generic} entry="LostPassword" />
                  </h3>
                </div>
                <Form className="mt-4" onSubmit={formik.handleSubmit}> 
                <Form.Group id="email" className="mb-4">
                    <Form.Label>
                        <TranslatableText group={translationsGroupNames.Generic} entry="Email" />
                    </Form.Label>
                    <Form.Control
                         {...formik.getFieldProps('email')}
                         isInvalid={!!formik.errors.email}
                         placeholder={genericTranslations.Email}
                         type="email"
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                </Form.Group>
                  <Form.Group>
                    <div className="d-flex justify-content-center align-items-center mb-4">
                        <ReCaptcha
                            ref={(el) => { captchaDemo = el; }}
                            size="normal"
                            render="explicit"
                            name="Recaptcha"
                            hl={"es"}
                            sitekey={apiUrl.RecaptchaURL}
                            onloadCallback={onLoadRecaptcha}
                            verifyCallback={verifyCallback}
                            expiredCallback ={onExpiredRecaptcha} 
                        />
                              {formik.touched.Recaptcha && formik.errors.Recaptcha ?
                                (
                                  <div className="fv-plugins-message-container">
                                      <div className="invalid-feedback d-block">{formik.errors.Recaptcha}</div>
                                  </div>
                                ):null
                              }
                    </div>
                  </Form.Group>
                 
                  <Button variant="primary" type="submit" className="w-100">
                    <TranslatableText group={translationsGroupNames.Generic} entry="ConfirmEmail" />
                  </Button>
                  <br/>
                  <br/>
                  <Button variant="primary" onClick={onCancelClick} className="w-100">
                    <TranslatableText group={translationsGroupNames.Generic} entry="Cancel" />
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

export default LostPassword;