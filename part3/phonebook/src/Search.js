const Search = ({setFilter}) => {
    return (
      <div className='inputs'>
        search: <input onChange={({target}) => setFilter(target.value)} />
      </div>
    )
  }

export default Search;