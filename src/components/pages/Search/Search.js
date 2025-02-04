import ResultVote from './ResultVote';
import "./Search.css";
import { useState } from 'react'
import { useInput } from '../../../customHooks/form-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { searchPoll } from '../../../firebaseFunctions/polls'
import { useUser } from '../../../context/UserContext';

function Search() {
  
  const user = useUser()
  const [ results, setResults ] = useState([])
  const { value:search, bind:bindSearch, reset:resetSearch } = useInput('')
  const [ searchMsg, setSearchMsg ] = useState('Type in the seach box and click the search icon, or press enter!')

  const handleSearch = (e) => {
    e.preventDefault()
    let trimmedSearch = search.trim()
    if (trimmedSearch !== '') {
      setSearchMsg("Searching...")
      // Wait for response from server with search results
      // Then use reducer to render components based on returned array of polls
      // pass result of query into reducer as payload
      searchPoll(search)
      .then(output => {
        if (output.length !== 0) {
          setSearchMsg("")
          setResults(output)
        }
        else {
          setSearchMsg("Nothing was found")
        }
      })
      .catch(error => {
        console.log(error)
        setSearchMsg("There was an unexpected error while searching, please refresh the page and try again")
      })
    }
    else {
      setSearchMsg("Please give us something to search for")
    }
    resetSearch()
  }
  
  return(
    <div className="searchContainer" onSubmit={handleSearch}>
      <span className="searchMessage"> {searchMsg} </span>
      <div className="mainSearchBar">
        <form className="searchBar">
            <input type="search" placeholder="Search for a vote..." {...bindSearch}/>
            <FontAwesomeIcon icon={['fas', 'search']} onClick={handleSearch}/>
        </form>
        {user !== null && <Link to='/organise' className="organiseButton">Organise a Vote</Link>}
      </div>
      <div className="profileResultGrid">
        {results.map(result => {
        return <ResultVote key={result.data.voteCode} result={result.data}/>
        })}
      </div>
    </div>
  )
}
export default Search;