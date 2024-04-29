import React, { FC } from 'react'

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
  <p dangerouslySetInnerHTML={{ __html: question }} />
  <div>
    {
        answers.map((answer)=>
        (
            <div key={answer}>
                <button disabled={userAnswer?true:false} onClick={callback} value={answer}>
                    <span dangerouslySetInnerHTML={{__html:answer}}></span>
                </button>
                </div>
        ))
    }
  </div>
    </>
  )
}

export default QuestionCard;
