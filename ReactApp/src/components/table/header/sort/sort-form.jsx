import React from "react";
import { Button } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";

import { TranslatableText } from "../../../translations";

import { translationsGroupNames } from "../../../../utils/translationsGroupNames";

export default function SortForm({ order = [], value: getValue, conditions: getConditions = (value) => ({}), onOrderChange = (order) => { } }) {
  getValue = getValue || ((order) => {
    const conditions = getConditions();
    const key = Object.keys(conditions)[0];
    const condition = order.find((condition) => !!condition[key]) || {};
    return condition[key];
  });

  const value = getValue(order);

  const handleSortAscendingClick = () => {
    const value = 'asc';
    const conditions = getConditions(value);
    const changedKeys = Object.keys(conditions);
    const unchanged = order.filter((conditions) => {
      const keys = Object.keys(conditions);
      return keys.length !== changedKeys.length || keys.some((key) => !changedKeys.includes(key));
    });
    onOrderChange([...unchanged, conditions]);
  };
  const handleSortDescendingClick = () => {
    const value = 'desc';
    const conditions = getConditions(value);
    const changedKeys = Object.keys(conditions);
    const unchanged = order.filter((conditions) => {
      const keys = Object.keys(conditions);
      return keys.length !== changedKeys.length || keys.some((key) => !changedKeys.includes(key));
    });
    onOrderChange([...unchanged, conditions]);
  };

  return (
    <div className="d-grid gap">
      <Button variant={value === 'asc' ? undefined : 'link'} onClick={handleSortAscendingClick}>
        <FontAwesomeIcon icon={faSortAmountUp} className="me-2" />
        <TranslatableText group={translationsGroupNames.Generic} entry="Ascendente" />
      </Button>
      <Button variant={value === 'desc' ? undefined : 'link'} onClick={handleSortDescendingClick}>
        <FontAwesomeIcon icon={faSortAmountDown} className="me-2" />
        <TranslatableText group={translationsGroupNames.Generic} entry="Descendente" />
      </Button>
    </div>
  );
}