import React, { FC } from 'react'
import "../app.css";

type Props={
    question:string;
    answers:string[];
    callback:any;
    userAnswer:any;
    questionNr:number;
    totalQuestions:number;
}

const QuestionCard : FC<Props>=({question,answers,callback,userAnswer,questionNr,totalQuestions})=> {
   
  return (
    <>
    <p className='number'>
    Question: {questionNr} / {totalQuestions}
  </p>
  <div className='question-answer-divide'>
<div className='question'>
  <p dangerouslySetInnerHTML={{ __html: question }} />
</div>
  <div className='answer'>
    {
        answers.map((answer)=>
            (
                <div key={answer} >
                <button className='answer-btn' disabled={userAnswer?true:false} onClick={callback} value={answer}>
                    <span dangerouslySetInnerHTML={{__html:answer}}></span>
                </button>
                </div>
        ))
    }
    </div>
  </div>
    </>
  )
}

export default QuestionCard;
