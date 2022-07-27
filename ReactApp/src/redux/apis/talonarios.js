import createApi from '../createApi';

import { apiUrl } from '../../utils/apiUrl';

export const api = createApi({
  reducerPath: 'api:talonarios',
  url: apiUrl.Talonarios,
  endpoints: (builder) => ({
    get: builder.get(),
    getItems: builder.getItems(),
    getList: builder.getList(),
    add: builder.add()
  })
});

export const { useGetQuery, useGetItemsQuery, useGetListQuery, useAddMutation } = api;