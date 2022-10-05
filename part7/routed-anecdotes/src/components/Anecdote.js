const Anecdote = ({ anecdote, vote }) => {
    return (
        <div style={{marginBottom: "24px"}}>
            <h2>{anecdote.content}</h2>
            <h3>by {anecdote.author}</h3>
            <p>Has {anecdote.votes} votes <button onClick={() => vote(anecdote.id)}>Vote</button></p>
            <div>More info: <a href={anecdote.info}>{anecdote.info}</a></div>
        </div>
    )
}

export default Anecdote;