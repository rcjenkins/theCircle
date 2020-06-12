import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { loadQuiz, selectQuiz } from '../features/quiz/quizSlice';

jest.mock('../features/quiz/quizSlice');

test('App renders quiz and question text', () => {
  selectQuiz.mockReturnValue({
    answers: [],
    isFetching: false,
    error: null,
    currentQuestionId: 0,
    quiz: {
      id: 0,
      title: 'Daily Engagement Service',
      questions: [
        {
          id: 0,
          title: 'Did you enjoy yourself today?',
          type: 'button',
          answers: [
            {
              id: 0,
              text: 'Hell Yes!',
              nextQuestionId: 1,
            },
            {
              id: 1,
              text: 'Nope... :-(',
              nextQuestionId: 2,
            },
          ],
        },
      ],
    },
  });

  loadQuiz.mockReturnValue({
    type: 'fake-action', // we are bypassing the load from file as we are mocking the stores state
    payload: {},
  });

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const initialState = {};
  const store = mockStore(initialState);

  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const quizText = getByText(/Daily Engagement Service/i);
  const questionText = getByText(/Did you enjoy yourself today?/i);
  expect(quizText).toBeInTheDocument();
  expect(questionText).toBeInTheDocument();
});
