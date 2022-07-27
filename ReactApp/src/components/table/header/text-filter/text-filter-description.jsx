import React from 'react';
import { Badge, CloseButton } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function TextFilterDescription({ className, filter = {}, value: getValue, conditions: getConditions = (value) => ({}), onFilterChange = (filter) => { } }) {
  getValue = getValue || ((filter) => {
    const conditions = getConditions();
    const key = Object.keys(conditions)[0];
    return filter[key];
  });

  const description = getValue(filter);

  const closeClickHandler = () => {
    const conditions = getConditions();
    onFilterChange({ ...filter, ...conditions });
  };

  if (description) {
    return (
      <Badge bg="light" text="dark" className={className}>
        <FontAwesomeIcon icon={faFilter} className="me-1" />
        {description}
        <CloseButton className="ms-1" onClick={closeClickHandler} />
      </Badge>
    );
  }
  else {
    return (<></>);
  }
}