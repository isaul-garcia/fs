import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './Search'
import Countries from './Countries'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countryNameToShow =
    filter === ""
    ? []
    : countries.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      );
  
  return (
    <div>
      <h2>Find countries</h2>
      <Search setFilter={setFilter} />
      <Countries countries={countryNameToShow} />
    </div>
  )
}

export default App