import React from 'react';
import { Card } from 'react-bootstrap';

export default function SectionBody({ children, className }) {
  return (
    <Card.Body className={className}>
      {children}
    </Card.Body>
  );
}