const Person = ({person, remove}) => {
    return (
        <div className='person'>
          <div><button onClick={() => {
            const id = person.id
            const name = person.name
            remove(id, name)}}>delete</button> {person.name} {person.number}
          </div>
        </div>
    )
  }
  
  const Persons = ({persons, removePerson}) => {
    return (
      <>
        {persons.map(person => 
          <Person key={person.id} person={person} remove={removePerson} />
        )}
      </>
    )
  }

export default Persons;