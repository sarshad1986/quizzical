import React from "react"
import shuffle from "lodash/shuffle"
import {decode} from 'html-entities';

export default function Question({
  correct_answer,
  incorrect_answers,
  question,
  selectedAnswer,
  onSelectAnswer,
  showCorrectAnswer
}) {
  const [possibleAnswers, setPossibleAnswers] = React.useState([])

  React.useEffect(() => {
    setPossibleAnswers(shuffle([correct_answer, ...incorrect_answers]))
  }, [correct_answer, incorrect_answers])

  const answerElements = possibleAnswers.map((answer, idx) => {
    let styles

    if (showCorrectAnswer) {
      let backgroundColor, color, border, opacity
      if (answer === correct_answer) {
        backgroundColor = '#94D7A2'
        color = '#293264'
        border = 'none'
      } else if (answer === selectedAnswer) {
        backgroundColor = '#F8BCBC'
        color = 'grey'
        border = 'none'
        opacity = '0.7'
      } else {
        backgroundColor = 'white'
        color = 'grey'
        border = 'solid grey 1px'
        opacity = '0.7'
      }
      styles = {
        backgroundColor: backgroundColor,
        color: color,
        border: border,
        opacity: opacity
      }
    } else {
      styles = {
        backgroundColor: selectedAnswer === answer ? '#D6DBF5' : "white",
        border: selectedAnswer === answer ? "none" : "solid #4D5B9E 1px"
      }
    }

    return (
      <div key={idx}>
        <h4 className="answer" style={styles} onClick={() => onSelectAnswer(answer)}>
          {decode(answer)}
        </h4>
      </div>
    )
  })

  return (
    <div>
      <h3>{decode(question)}</h3>
      <h4 className="answer-container">{answerElements}</h4>
      <hr />
    </div>
  )
}
