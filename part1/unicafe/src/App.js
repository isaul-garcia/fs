import React, { useState } from 'react'

const Statistic = ({text, value, symbol}) => (
<>
  <tr>
    <td>{text}</td>
    <td>{value}{symbol}</td>
  </tr>
</>
)

const Statistics = ({good, neutral, bad}) => {
  
  const all = good + neutral + bad
  const average = ((good * 1 + bad * -1)/ all)
  const positive = (good / all) * 100

  if (all === 0) {
    return (
      <div>no feedback given</div>
    )
  }
  return (
    <table>
      <Statistic value={good} text="good " />      
      <Statistic value={neutral} text="neutral " />      
      <Statistic value={bad} text="bad " />
      <br></br>
      <Statistic value={all} text="all " />
      <Statistic value={average} text="average " />
      <Statistic value={positive} text="positive " symbol="%" />
    </table>
    )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickedGood = () => setGood(good + 1)
  const clickedNeutral = () => setNeutral(neutral + 1)
  const clickedBad = () => setBad(bad + 1)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={clickedGood} text="good" />
      <Button handleClick={clickedNeutral} text="neutral" />
      <Button handleClick={clickedBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />    
    </div>
  )
}

export default App