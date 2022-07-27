import React, { useCallback, useRef } from 'react';
import { Accordion, Card } from '@themesberg/react-bootstrap';

import { Pagination } from './pagination';

export default function Manager({ header: Header, filter: Filter, table: Table = () => <></>, source = { data: [], length: 0 }, onQueryChange = (query) => { } }) {
  const query = useRef({ filter: {}, order: [], pagination: { index: 0, size: 10 } });

  const filterChangeHandler = (filter) => {
    query.current = { ...query.current, filter, pagination: { ...query.current.pagination, index: 0 } };
    onQueryChange(query.current);
  };
  const tableQueryChangeHandler = ({ filter, order }) => {
    query.current = { ...query.current, filter, order, pagination: { ...query.current.pagination, index: 0 } };
    onQueryChange(query.current);
  };
  const paginationChangeHandler = useCallback((pagination) => {
    query.current = { ...query.current, pagination };
    onQueryChange(query.current);
  }, []);

  return (
    <Card className="mt-4">
      <Card.Header>
        <Header />
      </Card.Header>
      <Card.Body>
        {
          (Filter) ?
            <div className="table-settings mb-4">
              <Accordion>
                <Accordion.Item eventKey="filter">
                  <Accordion.Button>
                    <span>
                      <span className="sidebar-icon"></span>
                      <span className="sidebar-text">Filter</span>
                    </span>
                  </Accordion.Button>
                  <Accordion.Body>
                    <Filter onSubmit={filterChangeHandler} />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div> : <></>
        }
        <Table values={source.data} onQueryChange={tableQueryChangeHandler} />
        <Pagination className="mt-4" index={query.current.pagination.index} length={source.length} onChange={paginationChangeHandler} />
      </Card.Body>
    </Card>
  );
}