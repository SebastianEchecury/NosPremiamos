import React, { Children, cloneElement, isValidElement, useContext } from 'react';
import { Accordion, AccordionContext, Nav, useAccordionButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import SidebarItem from "./sidebar-item";

import './sidebar-item.scss';

const NavLinkToogle = ({ eventKey, icon, title }) => {
  const { activeEventKey } = useContext(AccordionContext);
  const isCurrentEventKey = activeEventKey === eventKey;

  const clickHandler = useAccordionButton(eventKey);

  return (
    <Nav.Link onClick={clickHandler} className="sidebar-item d-flex">
      <span>
        <FontAwesomeIcon icon={icon} />
      </span>
      <span className="flex-fill text-start ms-2">
        {title}
      </span>
      <span>
        <FontAwesomeIcon icon={isCurrentEventKey ? solid('angle-down') : solid('angle-right')} />
      </span>
    </Nav.Link>
  );
};

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

export default function CollapsableSidebarItem({ children, defaultActiveKey, icon, title, onClick }) {
  if (isEmpty(children)) {
    return (<></>);
  }
  else {
    return (
      <Accordion>
        <Nav fill variant="pills" defaultActiveKey={defaultActiveKey}>
          <Nav.Item className="m-0" >
            <NavLinkToogle eventKey={title} icon={icon} title={title} />
          </Nav.Item>
          <Accordion.Collapse eventKey={title} className="ps-4 w-100">
            <>
              {Children.map(children, (child) => {
                if (isValidElement(child)) {
                  if (child.type === CollapsableSidebarItem) {
                    return isValidElement(child) && cloneElement(child, { defaultActiveKey, onClick: onClick })
                  }
                  else {
                    return isValidElement(child) && cloneElement(child, { onClick: onClick })
                  }
                }
              })}
            </>
          </Accordion.Collapse>
        </Nav>
      </Accordion>
    );
  }
}