import { apiSlice } from "../lib/redux/apiSlice";
import { toast } from "react-toastify";
import { nextQ } from "../lib/redux/questionSlice";

export const findingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFinding: builder.mutation({
      query: (formData) => ({
        url: "/finding/create",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        toast.loading("Please wait...", {
          toastId: "cF_loading",
        });
        try {
          const { data } = await queryFulfilled;
          const { message } = data;
          toast.update("cF_loading", {
            render: message,
            type: "success",
            isLoading: false,
            autoClose: 700,
          });

          dispatch(nextQ());
        } catch (error) {
          toast.update("cF_loading", {
            render: error,
            type: "error",
            isLoading: false,
            autoClose: 1000,
          });
        }
      },
    }),
    getFindings: builder.query({
      query: () => ({
        url: "/finding",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateFindingMutation, useGetFindingsQuery } =
  findingApiSlice;
