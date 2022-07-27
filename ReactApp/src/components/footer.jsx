import React from "react";
import { Card } from '@themesberg/react-bootstrap';

export default () => {
  return (
    <footer className="footer section py-5">
      <p className="mb-0 text-center text-xl-left">
        Copyright ©
        <Card.Link href="https://tecso.coop/" target="_blank" className="text-blue text-decoration-none fw-normal ms-1">
          Tecso
        </Card.Link>
      </p>
    </footer>
  );
};
