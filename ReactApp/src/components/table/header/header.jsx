import React, { Children, cloneElement, isValidElement } from "react";

export default function Header({ children, className, filter = {},  onFilterChange = (filter) => { }, order = [], onOrderChange = (order) => { } }) {
  return (
    <th className="align-top">
      <div className={className}>
        {Children.map(children, (child) => isValidElement(child) && cloneElement(child, { filter, onFilterChange, order, onOrderChange }))}
      </div>
    </th>
  );
}