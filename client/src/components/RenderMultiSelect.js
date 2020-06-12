import { Input, Alert, Label, FormGroup, Button } from 'reactstrap';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuiz, addAnswer } from '../features/quiz/quizSlice';

const RenderMultiSelect = () => {
  const [state, setState] = useState({ selected: [] });

  const dispatch = useDispatch();
  const quizData = useSelector(selectQuiz);
  const question = quizData.quiz.questions.find(
    (element) => element.id === quizData.currentQuestionId,
  );

  const renderOption = (answer) => {
    return (
      <option key={answer.id} id={answer.id}>
        {answer.text}
      </option>
    );
  };

  const renderAlert = () => {
    return (
      <Alert color="danger">
        Please select one or more answers from the select.
      </Alert>
    );
  };

  const handleChange = (event) => {
    let options = event.target.options;
    let value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].id);
      }
    }

    setState({ selected: value });
  };

  const handleClick = () => {
    if (state.selected.length > 0) {
      dispatch(addAnswer(state.selected, question.nextQuestionId));
    } else {
      setState({ ...state, viewAlert: true });
    }
  };

  return (
    <>
      <FormGroup>
        <Label id="exampleSelectLabel" htmlFor="exampleSelect">
          {question.title}
        </Label>
        <Input
          type="select"
          name="select"
          id="exampleSelect"
          size={`${question.answers.length}`}
          multiple
          onChange={handleChange}
        >
          {question.answers.map((answer) => {
            return renderOption(answer);
          })}
        </Input>
      </FormGroup>
      <FormGroup>
        <Button color="primary" onClick={() => handleClick()}>
          Continue
        </Button>
      </FormGroup>

      {state.viewAlert && renderAlert()}
    </>
  );
};

export default RenderMultiSelect;
