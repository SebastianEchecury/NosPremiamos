import createApi from '../createApi';

import { apiUrl } from '../../utils/apiUrl';

export const api = createApi({
  reducerPath: 'api:permissions',
  url: apiUrl.Permissions,
  endpoints: (builder) => ({
    getItems: builder.getItems(),
    getList: builder.getList()
  })
});

export const { useGetItemsQuery, useGetListQuery } = api;