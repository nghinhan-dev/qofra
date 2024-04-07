import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
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
  },
});

export const { nextQ, skipQ, addQ } = questionSlice.actions;
export const selectAuditQuestionay = (state) => state.question.auditQuestion;
export default questionSlice.reducer;
