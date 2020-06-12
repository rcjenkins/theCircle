import React from 'react';
import Quiz from './components/Quiz';
import { Container } from 'reactstrap';

import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Container>
          <h1>Take the Survey</h1>
        </Container>
      </header>
      <main>
        <Container>
          <Quiz />
        </Container>
      </main>
      <footer>
        <Container className="mt-2">
          <p>For further information please email rcjenkins@hotmail.com</p>
        </Container>
      </footer>
    </div>
  );
}

export default App;
