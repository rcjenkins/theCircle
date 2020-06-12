import { Button, FormGroup } from 'reactstrap';
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectQuiz, addAnswer } from '../features/quiz/quizSlice';

const RenderButton = () => {
  const dispatch = useDispatch();
  const quizData = useSelector(selectQuiz);
  const question = quizData.quiz.questions.find(
    (element) => element.id === quizData.currentQuestionId,
  );

  const handleClick = (id) => {
    const nextPage = question.answers.find((element) => element.id === id)
      .nextQuestionId;
    dispatch(addAnswer([id.toString()], nextPage));
  };

  const button = (answer) => {
    return (
      <React.Fragment key={answer.id}>
        <Button
          aria-label="question"
          id={`button-${answer.id}`}
          color="primary"
          onClick={() => {
            handleClick(answer.id);
          }}
        >
          {answer.text}
        </Button>{' '}
      </React.Fragment>
    );
  };

  return (
    <FormGroup role="group">
      <div id="question" className="label label-default">
        {question.title}
      </div>
      <span>
        {question.answers.map((answer) => {
          return button(answer);
        })}
      </span>
    </FormGroup>
  );
};

export default RenderButton;
