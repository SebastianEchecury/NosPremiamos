import React from 'react';
import { Col, Row, Container, Card } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from './../../../../../routes';
import { translationsGroupNames } from './../../../../../utils/translationsGroupNames';
import { TranslatableText } from '../../../../../components/translations';

const SuccessPassword = () => {
    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center form-bg-image" >
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <div className="alert alert-success" role="alert">
                                        <TranslatableText group={translationsGroupNames.Generic} entry="SuccessChangePassword" />                                        
                                    </div>
                                    <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                                        <TranslatableText group={translationsGroupNames.Generic} entry="ReturnToLogin" />
                                    </Card.Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
}
export default SuccessPassword;