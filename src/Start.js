import React from "react"

export default function Start(props) {
  return (
    <div className="start">
      <h1>Quizzical</h1>
      <p>Test your knowledge if you dare!</p>
      <button onClick={props.onClick} className="btn-blue btn-margin">Start quiz</button>
    </div>
  )
}
