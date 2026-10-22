import { useEffect, useState } from "react";

export default function Quiz({ questions, title, resetKey }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setCurrent(0);
    setAnswers([]);
  }, [resetKey]);

  const question = questions[current];
  const selected = answers[current];
  const finished = current === questions.length;
  const score = answers.reduce(
    (total, answer, index) => total + (answer === questions[index].correct ? 1 : 0),
    0
  );

  if (finished) {
    const percent = Math.round(score / questions.length * 100);
    return (
      <section className="quiz-result" aria-live="polite">
        <span>COMPLETE</span>
        <strong>{score} / {questions.length}</strong>
        <h3>{percent >= 80 ? "You have a very solid grasp of knowledge." : percent >= 60 ? "The foundation is good, let's review a few ideas." : "Please read the article again and try again."}</h3>
        <p>You answered correctly {percent}% of questions.</p>
        <button onClick={() => {setCurrent(0);setAnswers([]);}}>Redo</button>
      </section>);

  }

  const choose = (index) => {
    if (selected !== undefined) return;
    setAnswers((items) => [...items, index]);
  };

  return (
    <fieldset className="lesson-quiz">
      <legend>{title}</legend>
      <div className="quiz-progress" aria-label={`Question ${current + 1} of ${questions.length}`}>
        <span style={{ transform: `scaleX(${(current + 1) / questions.length})` }} />
      </div>
      <small>QUESTION {current + 1} / {questions.length}</small>
      <p>{question.question}</p>
      <div className="quiz-options">
        {question.options.map((option, index) => {
          const revealed = selected !== undefined;
          const className = revealed && index === question.correct ?
          "answer-correct" :
          revealed && index === selected ?
          "answer-wrong" :
          "";
          return (
            <button key={option} type="button" className={className} onClick={() => choose(index)}>
              <span>{String.fromCharCode(65 + index)}</span>
              {option}
            </button>);

        })}
      </div>
      {selected !== undefined &&
      <div className={`quiz-feedback ${selected === question.correct ? "feedback-correct" : ""}`} role="status">
          <strong>{selected === question.correct ? "Exactly." : "Not correct."}</strong>{" "}{question.explanation}
          <button type="button" onClick={() => setCurrent((value) => value + 1)}>
            {current === questions.length - 1 ? "See results" : "Next question"}
          </button>
        </div>
      }
    </fieldset>);

}
