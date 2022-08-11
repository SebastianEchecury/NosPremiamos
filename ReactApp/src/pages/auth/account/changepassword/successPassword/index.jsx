import React from 'react';
import { Col, Row, Container, Image, Button } from '@themesberg/react-bootstrap';
import { Routes } from './../../../../../routes';
import { translationsGroupNames } from './../../../../../utils/translationsGroupNames';
import { TranslatableText } from '../../../../../components/translations';
import { useHistory } from 'react-router-dom';
import ellipse22 from '../../../../../assets/images/ellipse22.png'

const SuccessPassword = () => {
    const history = useHistory();

    const onCancelClick = () => {
        history.push(Routes.Signin.path);
    };
    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center form-bg-image" >
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="p-4 p-lg-5">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <div>
                                        <h5> <TranslatableText  entry="Excelente" /></h5>
                                    </div>
                                    <div >
                                        <TranslatableText  entry="Tu cuenta está lista para empezar a usar" />                                        
                                    </div>
                                    <br/>
                                    <div >
                                    <Image src={ellipse22} />                                                                               
                                    </div>
                                    <br/>
                                    <Button variant="primary" onClick={onCancelClick} className="w-100">
                                      <TranslatableText group={translationsGroupNames.Generic} entry="Ir A Mi Cuenta" />
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
export default SuccessPassword;