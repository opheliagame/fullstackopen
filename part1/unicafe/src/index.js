import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({heading}) => (
  <h1>{heading}</h1>
)

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good+neutral+bad

  if(total === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={total} />
        <Statistic text='average' value={(1*good+bad*-1)/total} />
        <Statistic text='positive' value={good/total*100+"%"} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodFeedback = () => setFeedback({...feedback, good: feedback.good + 1})
  const handleNeutralFeedback = () => setFeedback({...feedback, neutral: feedback.neutral + 1})
  const handleBadFeedback = () => setFeedback({...feedback, bad: feedback.bad + 1})
  

  return (
    <div>
    <Header heading="give feedback" />
    <Button onClick={handleGoodFeedback} text='good' />
    <Button onClick={handleNeutralFeedback} text='neutral' />
    <Button onClick={handleBadFeedback} text='bad' />
    <Header heading="statistics" />
    <Statistics good={feedback.good} neutral={feedback.neutral} bad={feedback.bad} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))