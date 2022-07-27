import createApi from '../createApi';

import { apiUrl } from '../../utils/apiUrl';

export const api = createApi({
  reducerPath: 'api:cupos',
  url: apiUrl.Cupos,
  endpoints: (builder) => ({
    add: builder.add(),
    addCtg: builder.mutation({
      query: ({ fechaDesde, fechaHasta }) => ({
        url: 'ctg',
        method: 'POST',
        body: { fechaDesde, fechaHasta },
        responseHandler: (response) => {
          if (response.ok) {
            return response.json();
          }
          else {
            return response.json().then((response) => builder.normalizeErrors(response.errors));
          }
        }
      }),
      invalidatesTags: [{ type: builder.tagType, id: '*' }]
    }),
    get: builder.get(),
    getItems: builder.getItems(),
    getList: builder.getList()
  })
});

export const { useAddMutation, useAddCtgMutation, useGetQuery, useGetItemsQuery, useGetListQuery } = api;