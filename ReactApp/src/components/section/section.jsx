import React from 'react';
import { Card } from 'react-bootstrap';

import './style.scss';

export default function Section({ children, className }) {
  return (
    <Card className={`section b-0 ${className}`}>
      {children}
    </Card>
  );
}