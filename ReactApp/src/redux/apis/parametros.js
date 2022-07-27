import createApi from '../createApi';

import { apiUrl } from '../../utils/apiUrl';

export const api = createApi({
  reducerPath: 'api:parametros',
  url: apiUrl.Parametros,
  endpoints: (builder) => ({
    getItems: builder.getItems(),
    getList: builder.getList(),
    getByToken: builder.query({
      query: (token) => ({
        url: 'List',
        params: { token }
      }),
      transformResponse: (response) => (response.items[0])
    })
  })
});

export const { useGetItemsQuery, useGetListQuery, useGetByTokenQuery } = api;