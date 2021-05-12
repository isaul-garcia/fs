import React, { useState, useEffect } from 'react'
import Persons from './Persons'
import Search from './Search'
import NewContact from './NewContact'
import Notification from './Notification'
import contactService from './services/contacts'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()

    const nameTrim = `${newName}`.replace(/\s+/g, ' ').trim();
    const nameFind = persons.find( ({ name }) => name === nameTrim );
      if (nameFind === undefined) {
        const contactObject = {
          name: nameTrim,
          number: newNumber,
          id: persons.length + 1,
        }

        contactService
          .create(contactObject)
          .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
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

  const removeContact = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      contactService.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  }

  const contactsToShow = 
    filter === ""
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={errorMessage} />
        <Search setFilter={setFilter} />
      <h2>Add New</h2>
        <NewContact addContact={addContact}
          newName={newName} setNewName={setNewName}
          newNumber={newNumber} setNewNumber={setNewNumber}
        />
      <h2>Numbers</h2>
        <Persons contacts={contactsToShow} removeContact={removeContact} />
    </div>
  )
}

export default App