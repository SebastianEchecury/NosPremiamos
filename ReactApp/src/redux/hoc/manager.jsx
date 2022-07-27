import React from 'react';

export default function withRedux(api) {
  return (Manager) => {
    return ({ filter }) => {
      const [trigger, { data: source }] = api.useLazyGetListQuery();

      const queryChangeHandler = (query) => {
        trigger({ filter: { ...query.filter, ...filter }, order: query.order, pagination: query.pagination });
      };

      return (
        <Manager source={source} onQueryChange={queryChangeHandler} />
      );
    };
  };
}