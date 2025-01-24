import { appUrl } from '@/constants/appUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${appUrl}api`
    }),
    tagTypes: ['Wishlists'],
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data) => ({
                url: '/signup',
                method: 'POST',
                body: data
            })
        }),
        verifyCode: builder.mutation({
            query: (data) => ({
                url: '/verify-code',
                method: 'POST',
                body: data
            })
        }),
        toggleWishlistsApi: builder.mutation({
            query: (data) => ({
                url: `/wishlists`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Wishlists']
        }),
        getWishLists: builder.query({
            query: (email) => `/wishlists?email=${email}&property=false`,
            // keepUnusedDataFor: 300,
        }),
        getWishListsWithDetails: builder.query({
            query: (email) => `/wishlists?email=${email}&property=true`,
            // keepUnusedDataFor: 300,
            providesTags: ['Wishlists']
        }),
        addToCartApi: builder.mutation({
            query: (data) => ({
                url: `/cart`,
                method: `POST`,
                body: data
            })
        }),
        getCart: builder.query({
            query: (email) => `/cart?email=${email}&property=false`,
        }),
        getCartWithDetails: builder.query({
            query: (email) => `/cart?email=${email}&property=true`,
        }),
        getCoupon: builder.query({
            query: (code) => `/coupons?code=${code}`
        }),
        getProducts: builder.query({
            query: (query) => `/products?${query}`
        }),
        searchProducts: builder.query({
            query: (name) => `/products?name=${name}`
        }),
        getProductsCount: builder.query({
            query: () => `/products?count=true`
        }),
        payment: builder.mutation({
            query: (data) => ({
                url: '/payment',
                method: 'POST',
                body: data
            })
        })
    })
});
export const {
    useSignUpMutation,
    useVerifyCodeMutation,
    useToggleWishlistsApiMutation,
    useGetWishListsQuery,
    useGetWishListsWithDetailsQuery,
    useAddToCartApiMutation,
    useGetCartQuery,
    useGetCartWithDetailsQuery,
    useGetCouponQuery,
    useGetProductsQuery,
    useSearchProductsQuery,
    useGetProductsCountQuery,
    usePaymentMutation,
} = apiSlice;