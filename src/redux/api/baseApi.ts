import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4040/api" }),
  tagTypes: ["book", "borrow"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ page = 1, limit = 5 }) => `/books?page=${page}&limit=${limit}`,
      providesTags: ["book"],
    }),
    getBookById: builder.query({
      query: (id) => "/books/" + id,
      providesTags: ["book"],
    }),
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
      transformErrorResponse: (response) => {
        return response.data;
      },
    }),
    updateBook: builder.mutation({
      query: ({ bookData, id }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: ["borrow", "book"],
      transformErrorResponse: (response) => {
        return response.data;
      },
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: "/books/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["borrow", "book"],
    }),
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),
    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["borrow", "book"],
      transformErrorResponse: (response) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBorrowSummaryQuery,
  useBorrowBookMutation,
} = baseApi;
