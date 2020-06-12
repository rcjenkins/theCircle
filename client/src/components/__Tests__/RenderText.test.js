import React from 'react';
import RenderText from '../RenderText';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { selectQuiz } from '../../features/quiz/quizSlice';
import { selectAnswers, saveAnswers } from '../../features/quiz/answerSlice';

jest.mock('../../features/quiz/quizSlice');
jest.mock('../../features/quiz/answerSlice');

it('RenderText renders correctly', () => {
  selectAnswers.mockReturnValue({
    answers: null,
    isFetching: false,
    error: null,
  });

  saveAnswers.mockReturnValue({
    type: 'fake-action', //we dont want anything to happen here as we are not testing the fetch
    payload: {},
  });

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
          id: 2,
          title: "Sorry to hear that.  Why didn't work out today?",
          type: 'multiSelect',
          nextQuestionId: 3,
          answers: [
            {
              id: 8,
              text: 'Too much to do.',
            },
            {
              id: 9,
              text: 'Our processes got in the way.',
            },
            {
              id: 10,
              text: 'Too many meetings.',
            },
            {
              id: 11,
              text: "I'm missing some skills.",
            },
            {
              id: 12,
              text: 'I found my work boring.',
            },
            {
              id: 13,
              text: "I don't know I just had a bad day.",
            },
          ],
        },
      ],
    },
  });

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const initialState = {};
  const store = mockStore(initialState);
  const tree = renderer
    .create(
      <Provider store={store}>
        <RenderText />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
