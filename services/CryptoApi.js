
  
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders={
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'ae90647d12mshd00b6e20a8202b3p118194jsn62414aeb35e8'
}
  
const baseUrl='https://coinranking1.p.rapidapi.com'

const createRequest=(url)=>({url,headers:cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath:"cryptoApi",
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
      getCryptos:builder.query({
          query:(count)=>createRequest(`/coins?limit=${count}`)
      }),
       getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`)
}),
getCryptoHistory: builder.query({
  query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
}),
getExchanges: builder.query({
  query: () => createRequest('/exchanges'),
}),
}),
});

export const {
    useGetCryptosQuery,
     useGetCryptoDetailsQuery,
      useGetCryptoHistoryQuery,
      useGetExchangesQuery,
}=cryptoApi