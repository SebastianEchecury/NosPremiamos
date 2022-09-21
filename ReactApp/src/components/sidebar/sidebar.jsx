import React, { Children, cloneElement, isValidElement } from 'react';
import { useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import CollapsableSidebarItem from './collapsable-sidebar-item';

export default function Sidebar({ children }) {
  const { pathname } = useLocation();

  return (
    <Nav variant="pills" defaultActiveKey={pathname} className="h-100 d-flex flex-column">
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          if (child.type === CollapsableSidebarItem) {
            return cloneElement(child, { defaultActiveKey: pathname });
          }
          else {
            return cloneElement(child);
          }
        }
      })}
    </Nav>
  );
}
