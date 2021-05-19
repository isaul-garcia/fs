const Person = ({person, remove}) => {
    return (
        <li className='person'>
          <div><button onClick={() => {
            const id = person.id
            const name = person.name
            remove(id, name)}}>delete</button> {person.name} {person.number}
          </div>
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