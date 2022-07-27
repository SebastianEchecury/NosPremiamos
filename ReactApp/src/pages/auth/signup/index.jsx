import React, { useEffect, useState} from "react";
import { apiUrl } from '../../../utils/apiUrl';
import { userType as userTypeId } from '../../../utils/userTypes';
import { Col, Row, Form, Card, Button, FormCheck, Container, Modal } from '@themesberg/react-bootstrap';
import { ReCaptcha } from 'react-recaptcha-google';
import { useHistory } from 'react-router-dom';
import { TranslatableText, useTranslations } from "../../../components/translations";
import { useAddMutation } from '../../../redux/apis/users';
import { Routes } from "../../../routes";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { translationsGroupNames } from "../../../utils/translationsGroupNames";
import { useGetListQuery as useGetListContenidoQuery} from "../../../redux/apis/contenidos";

let Signup = (props) => {
    const [add, { isSuccess: isAddSuccess, isError: isAddError, data: addData, error: addError}] = useAddMutation();

    const { translations: genericTranslations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['FirstName', 'LastName', 'Email', 'TermsAndConditions', 'Recaptcha', 'UserType'] });
    const { translations: errorsTranslations } = useTranslations({ group: translationsGroupNames.Errors, keys: ['FieldRequired', 'InvalidFormat'] });
    const { data: { data: contenidos = [] } = {}  } = useGetListContenidoQuery();

    const history = useHistory();

    const [isReCaptchaValid, setisReCaptchaValid] = useState(false)

    //formik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            termsAndConditions: false,
            Recaptcha: false,
            userType: {
                id: userTypeId.RepresentativeLogistic
            },
            termiYcondicion: ''
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.FirstName)),
            lastName: Yup.string().required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.LastName)),
            email: Yup.string()
                .email(errorsTranslations.InvalidFormat.replace('{0}', genericTranslations.Email))
                .required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.Email)),
            termsAndConditions: Yup.boolean().oneOf([true], errorsTranslations.FieldRequired.replace('{0}', genericTranslations.TermsAndConditions)),
            Recaptcha: Yup.boolean().oneOf([!isReCaptchaValid], errorsTranslations.FieldRequired.replace('{0}', genericTranslations.Recaptcha)),
            userType: Yup.object().shape({
                id: Yup.string().required(errorsTranslations.FieldRequired.replace('{0}', genericTranslations.UserType))
            }),
        }),
        onSubmit: (values) => {
            if(isReCaptchaValid){
                add(values);
            }
        }
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {      
      setShow(true);
  }

   useEffect(() => {
        if (contenidos.length) {
          const contenido = contenidos.find((c=> c.tipoContenidoId==-1))
          if (contenido) {
            formik.setFieldValue('termiYcondicion', contenido.descripcion);
          }
          else {
            formik.setFieldValue('termiYcondicion', '');
          }
        }
      }, [formik.values.termiYcondicion, contenidos]);

    
    
    //Captcha
    let captchaDemo = '';

    useEffect(() => {
        if (captchaDemo) {
            captchaDemo.reset();
        }
    }, [])

    const onLoadRecaptcha = () => {
        if (captchaDemo) {
            captchaDemo.reset();
        }
    }

    const verifyCallback = (recaptchaToken) => {
        setisReCaptchaValid(true);
    }

    const onExpiredRecaptcha = (response) => {
            setisReCaptchaValid(false);
    }

    const onCancelClick = () => {
        history.goBack();
    };

    useEffect(() => {
        if (isAddSuccess) {
            history.push(Routes.Signup.VerifyEmail.path.replace(':id', addData.data.id));
        }
    }, [isAddSuccess, addData, history]);

    useEffect(() => {
        if (isAddError) {
            formik.setErrors({email: addError.data.userName});
        }
    }, [isAddError, addError]);

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center form-bg-image" >
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                <h3 className="mb-0">
                                    <TranslatableText group={translationsGroupNames.Generic} entry="SignupToOurPlatform" />
                                </h3>
                                </div>
                                <Form className="mt-4" onSubmit={formik.handleSubmit}>
                                    <Form.Group id="firstName" className="mb-4">
                                        <Form.Label>
                                            <TranslatableText group={translationsGroupNames.Generic} entry="YourFirstName" />
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...formik.getFieldProps('firstName')}
                                            isInvalid={!!formik.errors.firstName}
                                            placeholder={genericTranslations.FirstName}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.firstName}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group id="lastName" className="mb-4">
                                        <Form.Label>
                                            <TranslatableText group={translationsGroupNames.Generic} entry="YourLastName" />
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...formik.getFieldProps('lastName')}
                                            isInvalid={!!formik.errors.lastName}
                                            placeholder={genericTranslations.LastName}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group id="email" className="mb-4">
                                        <Form.Label>
                                            <TranslatableText group={translationsGroupNames.Generic} entry="Email" />
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            {...formik.getFieldProps('email')}
                                            isInvalid={!!formik.errors.email}
                                            placeholder={genericTranslations.Email}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <div className="d-flex justify-content-center align-items-center mb-4">
                                            <Form.Check type="checkbox">
                                                <FormCheck.Input
                                                    id="defaultCheck5"
                                                    {...formik.getFieldProps('termsAndConditions')}
                                                    isInvalid={!!formik.errors.termsAndConditions}
                                                    className="me-2"
                                                />
                                                <Card.Link className="small text-end" onClick={handleShow}>
                                                  <TranslatableText group={translationsGroupNames.Generic} entry="TermsAndConditions" />
                                                 </Card.Link>
                                                <Form.Control.Feedback type="invalid">{formik.errors.termsAndConditions}</Form.Control.Feedback>
                                            </Form.Check>
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <div className="d-flex justify-content-center align-items-center mb-4">
                                            <ReCaptcha
                                                ref={(el) => { captchaDemo = el; }}
                                                size="normal"
                                                render="explicit"
                                                name="recaptcha"
                                                sitekey={apiUrl.RecaptchaURL}
                                                onloadCallback={onLoadRecaptcha}
                                                verifyCallback={verifyCallback}
                                                expiredCallback ={onExpiredRecaptcha}
                                            />
                                            <br/>
                                            <br/>
                                            {formik.touched.Recaptcha && formik.errors.Recaptcha ? (
                                                <div className="fv-plugins-message-container">
                                                    <div className="invalid-feedback d-block">{formik.errors.Recaptcha}</div>
                                                </div>
                                            ) : <div></div>}
                                        </div>
                                    </Form.Group>
                                    <Button type="submit" variant="primary" className="w-100">
                                        <TranslatableText group={translationsGroupNames.Generic} entry="SignUp" />
                                    </Button>
                                    <br/>
                                    <br/>
                                    <Button variant="primary" onClick={onCancelClick} className="w-100">
                                        <TranslatableText group={translationsGroupNames.Generic} entry="IHaveAnAccount" />
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                    <TranslatableText group={translationsGroupNames.Generic} entry="TitleTermsAndConditions" />
                </Modal.Title>
              </Modal.Header>
              <Modal.Body> {formik.values.termiYcondicion}</Modal.Body>
               <Modal.Footer>
                 <Button variant="primary" onClick={handleClose}>
                   <TranslatableText group={translationsGroupNames.Generic} entry="Accept" />
                </Button>
               </Modal.Footer>
            </Modal>


        </main>
    );
};

export default Signup;