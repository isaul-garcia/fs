import React, { useState, useEffect } from 'react'
import Persons from './Persons'
import Search from './Search'
import NewPerson from './NewPerson'
import Notification from './Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const nameTrim = `${newName}`.replace(/\s+/g, ' ').trim();
    const nameFind = persons.find( ({ name }) => name === nameTrim );
      if (nameFind === undefined) {
        const personObject = {
          name: nameTrim,
          number: newNumber,
        }

        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(
              `${nameTrim} was added succesfully!`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        }
        else {
          window.alert(`${nameTrim} already added to the phonebook.`);
        }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
      setErrorMessage(
        `${name} has been deleted.`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const personsToShow = 
    filter === ""
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div className='card'>
      <h1>Phonebook</h1>
        <Notification message={errorMessage} />
        <Search setFilter={setFilter} />
      <h2>Add New</h2>
        <NewPerson addPerson={addPerson}
          newName={newName} setNewName={setNewName}
          newNumber={newNumber} setNewNumber={setNewNumber}
        />
      <h2>Numbers</h2>
        <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App