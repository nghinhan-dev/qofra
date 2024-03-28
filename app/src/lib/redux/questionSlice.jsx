import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questionArr: [],
  },
  reducers: {
    nextQ: (state) => {
      state.questionArr = state.questionArr.slice(1);
    },
    skipQ: (state, action) => {
      const newQuestion = action.payload;

      state.questionArr[0] = newQuestion;
    },
    addQ: (state, action) => {
      const questionArr = action.payload;

      state.questionArr = questionArr;
    },
  },
});

export const { nextQ, skipQ, addQ } = questionSlice.actions;
export const selectQuestionArray = (state) => state.question.questionArr;
export default questionSlice.reducer;
