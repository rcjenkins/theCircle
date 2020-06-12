import React from 'react';
import RenderButton from '../RenderButton';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { selectQuiz } from '../../features/quiz/quizSlice';

jest.mock('../../features/quiz/quizSlice');

it('RenderButton renders correctly', () => {
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

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const initialState = {};
  const store = mockStore(initialState);
  const tree = renderer
    .create(
      <Provider store={store}>
        <RenderButton />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
