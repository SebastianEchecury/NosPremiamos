import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './sidebar-item.scss';

export default function SidebarItem({ title, icon, link }) {
  return (
    <Nav.Item className="m-0 p-0">
      <Nav.Link as={Link} to={link} eventKey={link} className="sidebar-item d-flex">
        <span>
          {icon && <FontAwesomeIcon icon={icon} />}
        </span>
        <span className="flex-fill text-start ms-2">
          {title}
        </span>
      </Nav.Link>
    </Nav.Item>
  );
}