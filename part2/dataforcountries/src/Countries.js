const Country = ({country}) => {
    return (
      <>
        <div>{country.name}</div>
      </>
    )
  }
  
  const Countries = ({countries}) => {
    return (
      <>
        {countries.length > 10
          ? "Too many matches, specify another filter"
          : countries.map((country) => (
              <Country country={country} />
          ))}
      </>
    )
  }

export default Countries;