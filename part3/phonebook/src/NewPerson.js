const NewPerson = ({newName, setNewName, newNumber, setNewNumber, addPerson}) => {
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }
  
    return (
      <>
        <form className='newform' onSubmit={addPerson}>
          <div className='inputs'>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div className='inputs'>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </>
    )
  }

  export default NewPerson;