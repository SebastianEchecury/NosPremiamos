import React from 'react';
import { Form } from '@themesberg/react-bootstrap';

export default function PermissionCheck({ permission, ...props }) {
  const [application, area, page, displayName] = permission.description.split(' - ');

  return (
    <Form.Check>
      <Form.Check.Input {...props} />
      <Form.Check.Label className="ms-2">
        <strong>{area}</strong>: <small>{`${page} - ${displayName}`}</small>
      </Form.Check.Label>
    </Form.Check>
  );
}