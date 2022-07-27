import React from 'react';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, CloseButton } from '@themesberg/react-bootstrap';

export default function SortDescription({ className, order = [], value: getValue, conditions: getConditions = (value) => ({}), onOrderChange = (order) => { } }) {
  getValue = getValue || ((order) => {
    const conditions = getConditions();
    const key = Object.keys(conditions)[0];
    const condition = order.find((condition) => !!condition[key]) || {};
    return condition[key];
  });

  const value = getValue(order);

  const closeClickHandler = () => {
    const conditions = getConditions();
    const changedKeys = Object.keys(conditions);
    const unchanged = order.filter((conditions) => {
      const keys = Object.keys(conditions);
      return keys.length !== changedKeys.length || keys.some((key) => !changedKeys.includes(key));
    });
    onOrderChange([...unchanged, conditions]);
  };

  if (value === 'asc') {
    return (
      <Badge bg="light" text="dark" className={className}>
        <FontAwesomeIcon icon={faSortUp} />
        <CloseButton onClick={closeClickHandler} />
      </Badge>
    );
  }
  else if (value === 'desc') {
    return (
      <Badge bg="light" text="dark" className={className}>
        <FontAwesomeIcon icon={faSortDown} />
        <CloseButton onClick={closeClickHandler} />
      </Badge>
    );
  }
  else {
    return (<></>);
  }
}