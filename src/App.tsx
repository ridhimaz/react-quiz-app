import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { QuestionsState, fetchQuestions } from './API';
import "./app.css"

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  
 const startTrivia=async()=>{
  setLoading(true);
  setGameOver(false);
  const newQuestions= await fetchQuestions();
  setQuestions(newQuestions);
  setScore(0);
  setUserAnswers([]);
  setNumber(0);
  setLoading(false);
  console.log(newQuestions)
 }

 const checkAnswer=(e:any)=>{
  const correct=questions[number].correct_answer===e.currentTarget.value;
  const answer=e.target.value;

  const answerObject={
    question:questions[number].question,
    answer,
    correct,
    correctAnswer:questions[number].correct_answer
  }
  if(e.currentTarget.value===questions[number].correct_answer)setScore(prev=>prev+1);
  console.log(e.currentTarget.value);

  setUserAnswers((prev)=>[...prev, answerObject]);

 }
 const nextQuestion=()=>{
  
  const nextQuestion=number+1;
  if(nextQuestion===10)
    {
      setGameOver(true);
      setLoading(false);
    }
    setNumber(nextQuestion);
 }
  return (
    <div className="App">
    <h1 className='heading'>Itzzzz Quiz Time</h1>
    {
      gameOver?(<button onClick={startTrivia} className='btn btn-light start'>
      start
    </button>): null
    }
    {
      gameOver && !loading &&  <p className='score btn btn-light'>Score: {score}</p>
    }
   
    {
      loading?
      <p>Loading Questions...</p>: null
    }
    {
      !loading && !gameOver &&(
        <QuestionCard
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
      )
    }
   {
    !gameOver &&   <button onClick={nextQuestion} type="button" className="btn btn-light next">next</button>
   }
  
    </div>
  );
}

export default App;
