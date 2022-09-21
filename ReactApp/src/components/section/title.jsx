import React from 'react';
import { Card } from 'react-bootstrap';

export default function SectionTitle({ children, className }) {
  return (
    <Card.Title className={`m-0 ${className}`}>
      {children}
    </Card.Title>
  );
}