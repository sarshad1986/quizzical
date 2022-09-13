import React from "react"

import Start from "./Start"
import Quiz from "./Quiz"

export default function App() {
  const [quiz, setQuiz] = React.useState(false)

  function startQuiz() {
    setQuiz(true)
  }

  return (
    <div className="container">
      {quiz ?
      <Quiz /> :
      <Start onClick={startQuiz} />}
    </div>
  )
}
