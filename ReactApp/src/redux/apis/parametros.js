import createApi from '../createApi';

import { apiUrl } from '../../utils/apiUrl';

export const api = createApi({
  reducerPath: 'api:parametros',
  url: apiUrl.Parametros,
  endpoints: (builder) => ({
    update: builder.update(),
    get: builder.get(),
    getHeader: builder.query({
      query: () => ({ url: 'GetHeader' })
    }),
    getList: builder.getList(),
  })
});

export const { useUpdateMutation, useGetQuery, useGetHeaderQuery, useGetListQuery } = api;