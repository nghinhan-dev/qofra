import { apiSlice } from "../lib/redux/apiSlice";

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.mutation({
      query: (credentials) => ({
        url: "/questions/generate",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetQuestionsMutation } = questionApiSlice;
