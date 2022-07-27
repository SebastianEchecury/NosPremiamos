import React, { Children, cloneElement, isValidElement, useState } from "react";
import SimpleBar from 'simplebar-react';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Nav, Button, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

export default ({ children, brand: Brand = () => (<></>), header: Header = () => (<></>) }) => {
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);
  const onSidebarItemClick = () => setShow(false);

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="light" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to="/">
          <Brand />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <Header />
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              {Children.map(children, (child) => {
                if (isValidElement(child)) {
                  return cloneElement(child, { onClick: onSidebarItemClick });
                }
              })}
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
