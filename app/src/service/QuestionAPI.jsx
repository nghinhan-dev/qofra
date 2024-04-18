import { apiSlice } from "../lib/redux/apiSlice";
import { toast } from "react-toastify";
import { addQ, nextQ, skipQ } from "../lib/redux/questionSlice";

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuditQuestions: builder.mutation({
      query: (fields) => ({
        url: "/question/generate",
        method: "POST",
        body: { ...fields },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(addQ(data));
        } catch (error) {
          toast.error(error, {
            isLoading: false,
            autoClose: 1000,
          });
        }
      },
    }),
    passedQuestion: builder.mutation({
      query: (_id) => ({
        url: `/question/passed/${_id}`,
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        toast.loading("Please wait...", {
          toastId: "passedLodingToast",
        });
        try {
          const { data } = await queryFulfilled;
          const { message } = data;
          toast.update("passedLodingToast", {
            render: message,
            type: "success",
            isLoading: false,
            autoClose: 700,
          });

          dispatch(nextQ());
        } catch (error) {
          toast.update("passedLodingToast", {
            render: error,
            type: "error",
            isLoading: false,
            autoClose: 1000,
          });
        }
      },
    }),
    skipQuestion: builder.mutation({
      query: (fields) => {
        return {
          url: "/question/skip",
          method: "POST",
          body: { ...fields },
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        toast.loading("Please wait...", {
          toastId: "loadingSkipToast",
        });
        try {
          const { data } = await queryFulfilled;
          const { newQuestion } = data;
          toast.update("loadingSkipToast", {
            render: "Generate new question !!!",
            type: "success",
            isLoading: false,
            autoClose: 1000,
          });
          dispatch(skipQ(newQuestion));
        } catch (error) {
          toast.update("loadingSkipToast", {
            render: "Error",
            type: "error",
            isLoading: false,
            autoClose: 1000,
          });
        }
      },
    }),
    getQuestions: builder.query({
      query: (query) => ({
        url: query ? `/question${query}` : `/question`,
      }),
      providesTags: ["Question"],
    }),
    addQuestions: builder.mutation({
      query: (formData) => ({
        url: "/question/add",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        toast.loading("Please wait...", {
          toastId: "aQ_loading",
        });
        try {
          const { data } = await queryFulfilled;
          const { message } = data;
          toast.update("aQ_loading", {
            render: message,
            type: "success",
            isLoading: false,
            autoClose: 700,
          });
        } catch (error) {
          toast.update("aQ_loading", {
            render: error.data.message,
            type: "error",
            isLoading: false,
            autoClose: 1000,
          });
        }
      },
      invalidatesTags: ["Question"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAuditQuestionsMutation,
  usePassedQuestionMutation,
  useAddQuestionsMutation,
  useSkipQuestionMutation,
  useGetQuestionsQuery,
} = questionApiSlice;
