import React, { Children, cloneElement, isValidElement, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Accordion, Nav } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';

import SidebarItem from "./sidebar-item";

const isValidChild = (child) => {
  if (!isValidElement(child)) {
    return false;
  } else if (child.type === SidebarItem) {
    return true;
  } else if (child.type === CollapsableSidebarItem) {
    return Children.toArray(child.props.children).some((child) => isValidChild(child));
  } else {
    return false;
  }
};

const isEmpty = (children) => {
  return !Children.toArray(children).some((child) => isValidChild(child))
};

export default function CollapsableSidebarItem({ children, onClick, eventKey, title, icon }) {
  const location = useLocation();
  const { pathname } = location;
  const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";
  
  if (isEmpty(children)) {
    return (<></>);
  }
  else {
    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center border border-0">
            <span>
              {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /></span> : null}
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {Children.map(children, (child) => {
                if (isValidElement(child)) {
                  return cloneElement(child, { onClick: onClick });
                }
              })}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }
}