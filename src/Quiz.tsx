
import { useEffect, useState } from "react";
import { Question, Option, ResultInitialState } from "./utility/types";


interface QuizProps{
  questions: Question[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [optionIdx, setOptionIndx] = useState<number|null>(null);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [result, setResult] = useState<ResultInitialState>({ score: 0, correctAnswers: 0, wrongAnswers: 0 });
  const [showResult, setShowResult] = useState(false);
  



  if (!questions.length) {
    return <div>No questions found</div>;
  }
  const { description, options } = questions[currentQuestion];
  
  const onAnswerClick = (option:Option, index:number) => {
    setOptionIndx(index);
    setAnswer(option.is_correct);
  }

  const onNextClick = () => {
    setOptionIndx(null);
    setAnswer(null);
    setResult((prev) => ({
      ...prev,
      score: answer ? prev.score + 5 : prev.score,
      correctAnswers: answer ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: !answer ? prev.wrongAnswers + 1 : prev.wrongAnswers,
      
    }));

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };
  useEffect(() => {
    if (currentQuestion === questions.length) {
      alert(`Quiz Completed! \nScore: ${result.score} \nCorrect: ${result.correctAnswers} \nWrong: ${result.wrongAnswers}`);
    }
  }, [currentQuestion, result]);
  console.log(result);

  const onTryAgain = () => {
    setResult({ score: 0, correctAnswers: 0, wrongAnswers: 0 });
    setShowResult(false);
    setOptionIndx(null);
    setAnswer(null);

    setTimeout(() => {
      setCurrentQuestion(0);
    }, 0);
  };
  

  const onPrevClick = () => {
    if (currentQuestion >0 ) {
      setCurrentQuestion((prev) => prev - 1);
    } 
  }

  
  return (
    <div className="quiz-container">
      {!showResult ? (<>
        <span className="active-question-no">{currentQuestion + 1}</span>
        <span className="total-question">/{questions.length}</span>

        <h2>{description}</h2>
        <ul>
          {
            options.map((option, index) => (
              <li
                
                className={optionIdx === index ?'selected-answer':""}
                onClick={() => onAnswerClick(option, index)}
                key={`${questions[currentQuestion].id}-${ option.id }`}>
                {option.description}
              </li>
            ))
          }
        </ul>
      
        <div className="footer">
          <button
          onClick={onPrevClick}
          >
            {
              currentQuestion > 0 ? "Previous" : "Start"
            }
          </button>
          <button onClick={onNextClick} disabled={optionIdx === null}>
            {
              currentQuestion === questions.length-1 ? "Finish":"Next"
            }
          </button>
        </div>

      </>) : <div className="result">
          <h3>Result</h3>
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Total Score: <span>{result.score}</span>
          </p>
          <p>
            Correct Answers: <span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers: <span>{result.wrongAnswers}</span>
          </p>
          <button onClick={onTryAgain}>Try again</button>
      </div>}
      
    </div>
  );
}

export default Quiz;