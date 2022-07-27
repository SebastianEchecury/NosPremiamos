import React, { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import { Table as BootstrapTable } from "@themesberg/react-bootstrap";

import { useHistory } from 'react-router-dom';

export default function Table({ children, values = [], row: Row = () => <></>, onQueryChange = (query) => { } }) {
  const history = useHistory();
  const initialized = useRef(false);
  const filtro = useRef(JSON.parse(localStorage.getItem(history.location.key))? JSON.parse(localStorage.getItem(history.location.key)).filter : {});
  const orden = useRef(JSON.parse(localStorage.getItem(history.location.key))? JSON.parse(localStorage.getItem(history.location.key)).order: []);
  const query = useRef({ filter: filtro.current, order: orden.current });

  const filterChangeHandler = (filter) => {
    query.current = { ...query.current, filter };
    localStorage.setItem(history.location.key, JSON.stringify(query.current))
    onQueryChange(query.current);
  };
  const orderChangeHandler = (order) => {
    query.current = { ...query.current, order };
    localStorage.setItem(history.location.key, JSON.stringify(query.current))
    onQueryChange(query.current);
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const initialization = Children.toArray(children).reduce((initialization, child) => {
        const filter = child.props.filter || {};
        const order = child.props.order || [];

        return {
          ...initialization,
          filter: { ...initialization.filter, ...filter },
          order: [...initialization.order, ...order]
        };
      }, { filter: {}, order: [] });

      query.current = { ...query.current, filter: {...query.current.filter, ...initialization.filter}, order: [...query.current.order, ...initialization.order] };
      onQueryChange(query.current);
    }
  }, [])

  return (
    <BootstrapTable>
      <thead>
        <tr>
          {Children.map(children, (child) => isValidElement(child) && cloneElement(child, { ...child.props, filter: query.current.filter, onFilterChange: filterChangeHandler, order: query.current.order, onOrderChange: orderChangeHandler }))}
        </tr>
      </thead>
      <tbody>
        {values.map((value, index, values) => <Row key={index} value={value} index={index} values={values} />)}
      </tbody>
    </BootstrapTable>
  );
}