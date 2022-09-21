import React from 'react';
import { Card } from 'react-bootstrap';

import './style.scss';

export default function SectionFooter({ children }) {
  return (
    <Card.Footer className="footer p-3">
      {children}
    </Card.Footer>
  );
}