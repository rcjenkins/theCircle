import { configureStore } from '@reduxjs/toolkit';
import quizReducer from '../features/quiz/quizSlice';
import answersReducer from '../features/quiz/answerSlice';

export default configureStore({
  reducer: {
    quiz: quizReducer,
    answers: answersReducer,
  },
});
