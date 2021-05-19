const Search = ({setFilter}) => {
    return (
      <div>
        search: <input onChange={({target}) => setFilter(target.value)} />
      </div>
    )
  }

export default Search;