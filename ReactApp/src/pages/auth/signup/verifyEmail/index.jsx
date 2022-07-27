import React from 'react';
import { Col, Row, Container, Button, Card } from '@themesberg/react-bootstrap';
import { TranslatableText, useTranslations } from "../../../../components/translations";
import { Link, useHistory, useParams } from 'react-router-dom';
import { Routes } from "../../../../routes";
import { useAddMutation, useGetQuery as useGetUserQuery } from '../../../../redux/apis/users';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { translationsGroupNames } from '../../../../utils/translationsGroupNames';

const VerifyEmail = () => {

    const { translations: genericTranslations } = useTranslations({ group: translationsGroupNames.Generic, keys: ['ReenvioMail'] });
    const [add, { isSuccess: isAddSuccess, isError: isAddError, data: addData, error: addError}] = useAddMutation();
    const { id } = useParams();
    const { data: { firstName, lastName, email, userType, userRoles } = {} } = useGetUserQuery(id);

    const notReceiveEmail = () => {
        const entity= {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            userType: userType,
            userRoles: (userRoles || []).map((id) => `${id}`)
        }

        add(entity);
    };

    useEffect(() => {
        if (isAddSuccess) {
            toast.success(genericTranslations.ReenvioMail);
        }
    }, [isAddSuccess]);

    useEffect(() => {
        if (isAddError) {
            toast.error(addError.data.message);
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
                                    <div className="alert alert-success" role="alert">
                                        <TranslatableText group={translationsGroupNames.Generic} entry="ConfirmRegistrationEmail" /> 
                                        <br/>
                                        <TranslatableText group={translationsGroupNames.Generic} entry="VerifyEmailWelcome" />                                        
                                        <br/>
                                        <TranslatableText group={translationsGroupNames.Generic} entry="VerifySpam" />                                    
                                    </div>
                                    <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                                        <TranslatableText group={translationsGroupNames.Generic} entry="ReturnToLogin" />
                                    </Card.Link>
                                    <br/>
                                    <Button variant="light" onClick={notReceiveEmail} className="w-100">
                                            <TranslatableText group={translationsGroupNames.Generic} entry="NotReceiveEmail" />
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
}
export default VerifyEmail;