import { createSlice } from '@reduxjs/toolkit';

export const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    answers: null,
    isFetching: false,
    error: null,
  },
  reducers: {
    requestSaveAnswers: (state) => {
      state.response = null;
      state.isFetching = true;
      state.error = null;
    },
    successSaveAnswers: (state, action) => {
      state.response = action.payload;
      state.isFetching = false;
      state.error = null;
    },
    failedSaveAnswers: (state, action) => {
      state.response = null;
      state.isFetching = false;
      state.error = action.payload.message;
    },
  },
});

// saving the answers

export const saveAnswers = () => (dispatch, getState) => {
  const {
    requestSaveAnswers,
    successSaveAnswers,
    failedSaveAnswers,
  } = answersSlice.actions;
  const { quiz: quizSlice } = getState();
  const { quiz, answers } = quizSlice;

  // wrapping the simple answers array for sending to API
  const payload = {
    quizData: {
      quizId: quiz.id.toString(),
      questionAnswers: answers,
    },
  };
  const apiEndpoint = window.awsAPI.apiEndpoint + '?quizId=' + quiz.id;
  dispatch(requestSaveAnswers());
  fetch(apiEndpoint, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((json) => dispatch(successSaveAnswers(json)))
    .catch((error) => dispatch(failedSaveAnswers(error)));
};

export const selectAnswers = (state) => state.answers;

export default answersSlice.reducer;
