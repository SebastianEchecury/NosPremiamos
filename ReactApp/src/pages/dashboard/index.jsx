import React from "react";
import Cumpleaños from "./cumpleaños";
import Descuentos from "./descuentos";
import Novedades from "./novedades";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

export default () => {

  return (
    <div className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
       <Row>
        <Col xs={12} lg="auto" >
        <Cumpleaños></Cumpleaños>
        </Col>
        <Col xs="auto" className="d-none d-lg-block" >
        <Novedades></Novedades>
        </Col>
        <Col xs="auto" className="d-none d-lg-block" >
        <Descuentos></Descuentos>
        </Col>        
      </Row>
      
    </div>
  );
};
