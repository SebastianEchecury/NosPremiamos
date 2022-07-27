import createApi from '../createApi';

import { apiUrl } from '../../utils/apiUrl';

export const api = createApi({
  reducerPath: 'api:user-types',
  url: apiUrl.UserTypes,
  endpoints: (builder) => ({
    getItems: builder.getItems(),
    getList: builder.getList()
  })
});

export const { useGetItemsQuery, useGetListQuery } = api;