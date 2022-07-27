import createApi from '../createApi';

import { apiUrl } from '../../utils/apiUrl';

export const TiposMovimiento = {
  CargoSaldo: -1,
  PagoTasa: -2
};

export const api = createApi({
  reducerPath: 'api:representantes',
  url: apiUrl.Representantes,
  endpoints: (builder) => ({
    cargarSaldo: builder.mutation({
      query: (importe) => ({
        url: 'CargarSaldo',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: importe
      }),
      invalidatesTags: [{ type: `${builder.tagType}.movimientos`, id: '*' }]
    }),
    get: builder.get(),
    getItems: builder.getItems(),
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
    })
  })
});

export const { useCargarSaldoMutation, useGetQuery, useGetItemsQuery, useGetMovimientosQuery, } = api;