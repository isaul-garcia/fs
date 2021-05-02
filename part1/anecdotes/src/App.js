import React, { useState } from 'react'

const Anecdote = ({title, anecdote, voteAmount}) => (
  <>
    <h1>{title}</h1>
    <div>{anecdote}</div>
    <div>has {voteAmount} votes</div>
  </>
)

const Button = ({handleClick, text}) => (
  <>
    <button onClick={handleClick}>
      {text}
    </button>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)

  //create new array of 0s from the amount of anecdotes
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))


  const [highestVotes, setHighestVotes] = useState(0)

  //get a random number from the amount of anecdotes
  const getRandomNumber = () => Math.floor(Math.random() * anecdotes.length)

  //select a new random number from the amount of anecdotes
  const getAnecdote = () => {
    let i = getRandomNumber();
    while (i === selected) {
      i = getRandomNumber();
    }
    setSelected(i)
  }  

  //increase the amount of votes on the selected anecdote
  const upVote = () => {
    const copy = {...votes}
    copy[selected] += 1;
    setVotes(copy);
    high();
  }

  const high = () => {
    const copy = {...votes};
    var max = Math.max.apply(Math, copy);
    console.log(max)
    setHighestVotes(max);
  }
  

  return (
    <div>
      <Anecdote title={"Anecdote of the day"} anecdote={anecdotes[selected]} voteAmount={votes[selected]} />
      <Button handleClick={upVote} text="vote" />
      <Button handleClick={getAnecdote} text="random anecdote" /> 
      <Anecdote title={"Anecdote with the most votes"} anecdote={anecdotes[highestVotes]} voteAmount={highestVotes} />
    </div>
  )
}

export default App