import React, { useEffect, useState } from 'react';
const { simplify } = await import('mathjs');



const AlgebraGame = () => {
  const [expression, setExpression] = useState('2x - 3y + 4y - 5x');
  const [steps, setSteps] = useState([{ expression: expression, justification: 'Original Expression' }]);
  const [newExpression, setNewExpression] = useState('');
  const [justification, setJustification] = useState('');
  const [isLastStepCorrect, setIsLastStepCorrect] = useState(null);

  // Dynamically import mathjs library
  // useEffect(() => {
  //   async function fetchSimplify() {
  //     const { simplify } = await import('mathjs');
  //     setSimplify(simplify);
  //   }
  //   fetchSimplify();
  // }, []);

  const handleSubmitStep = () => {
    try {
      const isValid = isValidSimplification(expression, newExpression) && expression !== newExpression;

      setIsLastStepCorrect(isValid);

      if (isValid) {
        setExpression(newExpression);
        setSteps([...steps, { expression: newExpression, justification }]);
        setNewExpression('');
        setJustification('');
      } else {
        console.log('Simplification error: The simplification is incorrect or the expression remains unchanged.');
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };

  const isValidSimplification = (originalExpression, simplifiedExpression) => {
    try {
      // Simplify the parsed nodes and convert them to strings
      return simplify(originalExpression).toString() === simplify(simplifiedExpression).toString();
    } catch (error) {
      console.error('Error during simplification validation:', error);
      return false;
    }
  };

  const renderSteps = () => {
    return (
      <div className="steps-list">
        <h3>Simplification Steps</h3>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>
              <strong>Expression:</strong>
              <span dangerouslySetInnerHTML={{ __html: katex.renderToString(step.expression) }} />
              <br />
              <strong>Justification:</strong> {step.justification}
            </li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <div className="algebra-game">
      <h2>Algebra Game</h2>

      {renderSteps()}

      <div className="expression-area">
        Current Expression:  <span dangerouslySetInnerHTML={{ __html: katex.renderToString(expression) }} />
      </div>

      <div className="new-step">
        <input
          type="text"
          placeholder="Enter simplified expression"
          value={newExpression}
          onChange={(e) => setNewExpression(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter justification"
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
        />
        <button onClick={handleSubmitStep}>Submit Step</button>
        {isLastStepCorrect !== null && (
          <span className={isLastStepCorrect ? 'correct' : 'incorrect'}>
            {isLastStepCorrect ? '✓' : '✗'}
          </span>
        )}
      </div>
    </div>
  );
};

export default AlgebraGame;
