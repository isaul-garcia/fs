const Person = ({person, remove}) => {
    return (
        <li className='person'>
          <button onClick={() => {
            const id = person.id
            const name = person.name
            remove(id, name)}}>delete</button>
            <a> {person.name} {person.number}</a>
        </li>
    )
  }
  
  const Persons = ({contacts, removeContact}) => {
    return (
      <ul>
        {contacts.map(person => 
          <Person key={person.id} person={person} remove={removeContact} />
        )}
      </ul>
    )
  }

export default Persons;