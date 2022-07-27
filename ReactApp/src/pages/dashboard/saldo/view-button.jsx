import React from "react";
import { Button, OverlayTrigger, Tooltip } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { TranslatableText } from "../../../components/translations";
import { translationsGroupNames } from "../../../utils/translationsGroupNames";

export default ({ onClick, ...props }) => {
  return (
    <OverlayTrigger overlay={<Tooltip><TranslatableText group={translationsGroupNames.Generic} entry="View" /></Tooltip>}>
      <Button variant="link" className="text-white" onClick={onClick}>
        <FontAwesomeIcon icon={faEyeSlash} />
      </Button>
    </OverlayTrigger>
  );
};