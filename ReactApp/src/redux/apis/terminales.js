import createApi from '../createApi';

import { apiUrl } from '../../utils/apiUrl';

export const TiposMovimiento = {
  LiquidacionCuentaCorriente: -1,
  CobroEfectivo: -2,
  CobroCuentaCorriente: -3
};

export const api = createApi({
  reducerPath: 'api:terminales',
  url: apiUrl.Terminales,
  endpoints: (builder) => ({
    cobrarTasa: builder.mutation({
      query: (values) => ({
        url: 'CobrarTasa',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: values,
        responseHandler: (response) => {
          if (response.ok) {
            return response.json();
          }
          else {
            return response.json().then((response) => builder.normalizeErrors(response.errors));
          }
        }
      }),
      invalidatesTags: [builder.tagType, { type: `${builder.tagType}.movimientos`, id: '*' }]
    }),
    add: builder.add(),
    delete: builder.delete(),
    update: builder.update(),
    get: builder.get(),
    getItems: builder.getItems(),
    getList: builder.getList(),
    getMovimientos: builder.query({
      query: ({ filter, order = [], pagination = {} } = {}) => ({
        url: 'Movimientos',
        params: builder.normalizeQueryParameters({ filter, order, pagination })
      }),
      transformResponse: (response) => ({
        data: response.items,
        length: response.totalCount
      }),
      providesTags: (result) => {
        if (result?.data) {
          return [...result.data.map(({ id }) => ({ type: `${builder.tagType}.movimientos`, id })), { type: `${builder.tagType}.movimientos`, id: '*' }];
        }
        else {
          return [{ type: `${builder.tagType}.movimientos`, id: '*' }];
        }
      }
    }),
    liquidarCuentaCorriente: builder.mutation({
      query: (saldo) => ({
        url: 'LiquidarCtaCte',
        method: 'POST',
        params: { saldo },
        responseHandler: (response) => {
          if (response.ok) {
            return response.json();
          }
          else {
            return response.json().then((response) => builder.normalizeErrors(response.errors));
          }
        }
      }),
      invalidatesTags: [builder.tagType, { type: `${builder.tagType}.movimientos`, id: '*' }]
    })
  })
});

export const { useAddMutation, useDeleteMutation, useUpdateMutation, useGetQuery, useGetItemsQuery, useGetListQuery, useGetMovimientosQuery, useLiquidarCuentaCorrienteMutation, useCobrarTasaMutation } = api;