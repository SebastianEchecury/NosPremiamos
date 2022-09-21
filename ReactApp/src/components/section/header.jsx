import React from 'react';
import { Card } from 'react-bootstrap';

import './style.scss';

export default function SectionHeader({ children, className }) {
  return (
    <Card.Header className={`header p-3 ${className}`}>
      {children}
    </Card.Header>
  );
}