import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    answers: [],
    quiz: null,
    isFetching: false,
    error: null,
    currentQuestionId: null,
  },
  reducers: {
    requestLoadQuiz: (state) => {
      state.answers = [];
      state.quiz = null;
      state.isFetching = true;
      state.error = null;
      state.currentQuestionId = null;
    },
    successLoadQuiz: (state, action) => {
      state.answers = [];
      state.quiz = action.payload;
      state.isFetching = false;
      state.error = null;
      // make the currentQuestionId the first question id after load as some quizzes may not start at 0
      state.currentQuestionId = state.quiz.questions[0].id;
    },
    failedLoadQuiz: (state, action) => {
      state.answers = [];
      state.quiz = null;
      state.isFetching = false;
      state.error = action.payload.message;
      state.currentQuestionId = null;
    },
    addAnswer: (state, action) => {
      state.answers.push({
        id: state.currentQuestionId.toString(),
        answers: action.payload.answers,
      });
      state.currentQuestionId = action.payload.nextQuestionId;
    },
    removeAnswer(state) {
      const lastAnswer = state.answers.pop();
      if (lastAnswer) {
        state.currentQuestionId = lastAnswer.id;
      }
    },
  },
});

// I like to hide away the actual actions this stops potential typos in the parameter object

export const addAnswer = (answers, nextQuestionId) => (dispatch) => {
  const { addAnswer } = quizSlice.actions;
  dispatch(addAnswer({ answers, nextQuestionId }));
};

export const removeAnswer = () => (dispatch) => {
  const { removeAnswer } = quizSlice.actions;
  dispatch(removeAnswer());
};

// loading quiz data using API

export const loadQuiz = () => (dispatch) => {
  const {
    requestLoadQuiz,
    successLoadQuiz,
    failedLoadQuiz,
  } = quizSlice.actions;
  dispatch(requestLoadQuiz());

  //const localEndpoint = `${window.location.origin}/quiz-0.json`;
  const apiEndpoint = window.awsAPI.apiEndpoint + '?quizId=0';
  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((json) => dispatch(successLoadQuiz(json)))
    .catch((error) => dispatch(failedLoadQuiz(error)));
};

export const selectQuiz = (state) => state.quiz;

export default quizSlice.reducer;
