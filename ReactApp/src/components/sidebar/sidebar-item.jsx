import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge, Image, Nav } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarItem({ onClick, title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" }) {
  const location = useLocation();
  const { pathname } = location;
  const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
  const navItemClassName = link === pathname ? "active" : "";
  const linkProps = external ? { href: link } : { as: Link, to: link };

  return (
    <Nav.Item className={navItemClassName} onClick={onClick}>
      <Nav.Link {...linkProps} target={target} className={classNames}>
        <span>
          {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /></span> : null}
          {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}
          <span className="sidebar-text">{title}</span>
        </span>
        {badgeText ? (
          <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
        ) : null}
      </Nav.Link>
    </Nav.Item>
  );
}