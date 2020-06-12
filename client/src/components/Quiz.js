import React, { useEffect } from 'react';
import { Button, Card } from 'reactstrap';
import RenderButton from './RenderButton';
import RenderMultiSelect from './RenderMultiSelect';
import RenderText from './RenderText';

import { useSelector, useDispatch } from 'react-redux';
import { loadQuiz, selectQuiz, removeAnswer } from '../features/quiz/quizSlice';

import '../App.css';

function Quiz() {
  const dispatch = useDispatch();
  const data = useSelector(selectQuiz);

  useEffect(() => {
    dispatch(loadQuiz());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(removeAnswer());
  };

  if (data.error) {
    return <>Error: {data.error}</>;
  }

  if (!data.quiz && !data.isFetching) {
    return <>Starting...</>;
  }

  if (data.isFetching || !data.quiz) {
    return <>Loading...</>;
  }

  const renderType = data.quiz.questions.find(
    (element) => element.id === data.currentQuestionId,
  ).type;

  return (
    <fieldset>
      <legend>{data.quiz.title}</legend>
      <Card body>
        {renderType === 'button' && <RenderButton />}
        {renderType === 'multiSelect' && <RenderMultiSelect />}
        {renderType === 'text' && <RenderText />}
        {renderType !== 'text' &&
          data.currentQuestionId !== data.quiz.questions[0].id && (
            <div className="text-left">
              <Button
                color="link"
                onClick={() => {
                  handleClick();
                }}
              >
                &lt; Back
              </Button>
            </div>
          )}
      </Card>
    </fieldset>
  );
}

export default Quiz;
