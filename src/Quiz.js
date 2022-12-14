import React from "react"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Question from "./Question"

export default function Quiz() {
  const [quizData, setQuizData] = React.useState()
  const [selectedAnswers, setSelectedAnswers] = React.useState([])
  const [showCorrectAnswers, setShowCorrectAnswers] = React.useState(false)
  const [score, setScore] = React.useState()

  console.log('quiz_data', quizData)
  console.log('selectedAnswers', selectedAnswers)
  const { width, height } = useWindowSize()

  React.useEffect(() => {
    if (!quizData) {
      console.log('load data...')
      fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
      .then(response => response.json())
      .then(json => setQuizData(json))
    }
  }, [quizData])

  if (!quizData) {
    return (
      <div className="loading-container">
        <h3>Loading...</h3>
      </div>
    )
  }

  const questionsElements = quizData.results.map((question, index) => {
    console.log(question)
    const handleSelectAnswer = (answer) => {
      const newAnswers = [...selectedAnswers]
      newAnswers[index] = answer
      setSelectedAnswers(newAnswers)
    }
    return (
      <div key={index}>
        <Question
          {...question}
          selectedAnswer={selectedAnswers[index]}
          onSelectAnswer={handleSelectAnswer}
          showCorrectAnswer={showCorrectAnswers}
        />
      </div>
    )
  })

  function checkAnswers() {
    setShowCorrectAnswers(true)
    calculateScore()
  }

  function calculateScore() {
    let sum_of_correct_answers = 0
    selectedAnswers.forEach((selectedAnswer, index) => {
      if (selectedAnswer === quizData.results[index].correct_answer) {
        sum_of_correct_answers += 1
      }
    })
    setScore(sum_of_correct_answers)
  }

  function playAgain(){
    setShowCorrectAnswers(false)
    setScore(0)
    setSelectedAnswers([])
    setQuizData()
  }

  return (
    <div>
      {showCorrectAnswers && <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
      }}><Confetti width={width} height={height}/></div>}
      {questionsElements}
      <div className="check-box">
        {showCorrectAnswers ? (
          <div className="score-box">
            <h3 className="results">You scored {score}/5 correct answers</h3>
            <button className="btn-blue" onClick={playAgain}>Play Again</button>
          </div>
        ) : (
          <button className="btn-blue" onClick={checkAnswers}>Check answers</button>
        )}
      </div>
    </div>
  )
}
