import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    searchQuery: "",
    auditQuestion: [],
  },
  reducers: {
    nextQ: (state) => {
      state.auditQuestion = state.auditQuestion.slice(1);
    },
    skipQ: (state, action) => {
      const newQuestion = action.payload;

      state.auditQuestion[0] = newQuestion;
    },
    addQ: (state, action) => {
      const auditQuestion = action.payload;

      state.auditQuestion = auditQuestion;
    },
    updateQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { nextQ, skipQ, addQ, updateQuery } = questionSlice.actions;
export const selectAuditQuestionay = (state) => state.question.auditQuestion;
export default questionSlice.reducer;
