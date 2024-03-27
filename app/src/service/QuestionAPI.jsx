import { apiSlice } from "../lib/redux/apiSlice";

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.mutation({
      query: (fields) => ({
        url: "/question/generate",
        method: "POST",
        body: { ...fields },
      }),
    }),
    passedQuestion: builder.query({
      query: (_id) => ({
        url: `/question/${_id}/passed`,
      }),
    }),
    skipQuestion: builder.mutation({
      query: (fields) => ({
        url: "/question/skip",
        method: "POST",
        body: { ...fields },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetQuestionsMutation } = questionApiSlice;
