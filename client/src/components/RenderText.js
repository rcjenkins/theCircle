import React from 'react';
import { FormGroup, Alert } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuiz } from '../features/quiz/quizSlice';
import { selectAnswers, saveAnswers } from '../features/quiz/answerSlice';

const RenderText = () => {
  const dispatch = useDispatch();
  const quizData = useSelector(selectQuiz);
  const answerData = useSelector(selectAnswers);
  const question = quizData.quiz.questions.find(
    (element) => element.id === quizData.currentQuestionId,
  );

  if (!answerData.response && !answerData.isFetching) {
    dispatch(saveAnswers());
    return <></>;
  }

  return (
    <FormGroup>
      <b>{question.title}</b>
      {answerData.isFetching && <div>Saving...</div>}
      {answerData.error && <Alert color="danger">Saving failed</Alert>}
    </FormGroup>
  );
};

export default RenderText;
