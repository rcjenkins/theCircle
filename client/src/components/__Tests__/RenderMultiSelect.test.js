import React from 'react';
import RenderMultiSelect from '../RenderMultiSelect';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { selectQuiz } from '../../features/quiz/quizSlice';

jest.mock('../../features/quiz/quizSlice');

it('RenderMultiSelect renders correctly', () => {
  selectQuiz.mockReturnValue({
    answers: [],
    isFetching: false,
    error: null,
    currentQuestionId: 1,
    quiz: {
      id: 0,
      title: 'Daily Engagement Service',
      questions: [
        {
          id: 1,
          title: 'Great what contributed to your success today?',
          type: 'multiSelect',
          nextQuestionId: 4,
          answers: [
            {
              id: 2,
              text: 'My colleagues.',
            },
            {
              id: 3,
              text: 'I felt empowered to get my job done.',
            },
            {
              id: 4,
              text: 'I had access to all of the tools I needed to smash it.',
            },
            {
              id: 5,
              text: 'I could focus on my most important tasks.',
            },
            {
              id: 6,
              text: 'I knew exactly what I was doing so just nailed it.',
            },
            {
              id: 7,
              text: "I don't know.  I was just on a role.",
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
        <RenderMultiSelect />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
