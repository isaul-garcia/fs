import React from "react"
import { connect } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = ({ anecdotes, voteAnecdote, setNotification }) => {
    const vote = (id) => {
        voteAnecdote(id);
        const content = anecdotes.find((a) => a.id === id).content;
        setNotification(`You voted for "${content}"`, 5);
    };

    return (
        <div>
            {anecdotes.map(({ id, content, votes }) => (
                <div key={id} style={{ marginBottom: 10 }}>
                    <div>{content}</div>
                    <div>Has {votes} <button onClick={() => vote(id)}>⇧ Vote</button></div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state.filter === "") {
        return {
            anecdotes: state.anecdotes.sort((a, b) => b.votes - a.votes)
        }
    }
    const filterAnecdotes = (anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase());
    return {
        anecdotes: state.anecdotes
            .filter(filterAnecdotes)
            .sort((a, b) => b.votes - a.votes)
    }
}

const ConnectedAnecdoteList = connect(mapStateToProps, {
    voteAnecdote,
    setNotification,
})(AnecdoteList);
export default ConnectedAnecdoteList;