import React from 'react';
import { Card } from 'react-bootstrap';

export default function SectionSubtitle({ children, className }) {
  return (
    <Card.Subtitle className={`m-0 ${className}`}>
      {children}
    </Card.Subtitle>
  );
}