import React from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ title, icon, href, ...props }) => {
  return (
    <OverlayTrigger overlay={<Tooltip>{title}</Tooltip>}>
      <Link to={href} {...props}>
        <FontAwesomeIcon icon={icon} />
      </Link>
    </OverlayTrigger>
  );
};