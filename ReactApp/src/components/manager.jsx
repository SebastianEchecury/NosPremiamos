import React, { useCallback, useRef } from 'react';
import { Section, SectionBody, SectionFooter, SectionHeader, SectionTitle } from './section';
import TranslatableText from './translations/TranslatableText';

import { Pagination } from './pagination';

export default function Manager({  entry: Entrytitle, header: Header, filter: Filter, table: Table = () => <></>, source = { data: [], length: 0 }, onQueryChange = (query) => { } }) {
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
    <Section>
    <SectionHeader className="d-flex align-items-center">
      <SectionTitle className="flex-fill">
        <TranslatableText entry={Entrytitle} />
      </SectionTitle>
      <div className="d-block">
          <Header />
        </div>
    </SectionHeader>
    <SectionBody>
      <Table  values={source.data} onQueryChange={tableQueryChangeHandler} />
    </SectionBody>
    <SectionFooter>
      <Pagination index={query.current.pagination.index} length={source.length} onChange={paginationChangeHandler} />
    </SectionFooter>
  </Section>
  );
}