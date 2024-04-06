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
      invalidatesTags: ["Finding"],
    }),
    getFindings: builder.query({
      query: () => ({
        url: "/finding",
      }),
      providesTags: (result) => {
        console.log(result);
        return result
          ? [...result.map(({ id }) => ({ type: "Finding", id })), "Finding"]
          : ["Finding"];
      },
    }),
    getDetailFinding: builder.query({
      query: (findingID) => ({
        url: `/finding/${findingID}`,
      }),
    }),
    resolveFinding: builder.mutation({
      query: ({ _id, action }) => ({
        url: `/finding/${_id}`,
        method: "POST",
        body: { action },
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        toast.loading("Please wait...", {
          toastId: "rF_loading",
        });
        try {
          const { data } = await queryFulfilled;
          const { message } = data;
          toast.update("rF_loading", {
            render: message,
            type: "success",
            isLoading: false,
            autoClose: 700,
          });
        } catch (error) {
          toast.update("rF_loading", {
            render: error,
            type: "error",
            isLoading: false,
            autoClose: 1000,
          });
        }
      },
      invalidatesTags: ["Finding"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateFindingMutation,
  useGetFindingsQuery,
  useGetDetailFindingQuery,
  useResolveFindingMutation,
} = findingApiSlice;
