import ResultVote from './ResultVote';
import "./Search.css";
import { useState } from 'react'
import { useInput } from '../../../customHooks/form-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { searchPoll } from '../../../firebaseFunctions/polls'
import { useUser } from '../../../context/UserContext';

function Search() {
  
  const user = useUser() // the current user object from UserContext
  const [ results, setResults ] = useState([]) // Holds the results of the search query
  const { value:search, bind:bindSearch, reset:resetSearch } = useInput('') // Custom hook for input field handling and controlling
  const [ searchMsg, setSearchMsg ] = useState('Type in the seach box and click the search icon, or press enter!') // The current message being displayed to the user

  const handleSearch = (e) => { // Handles a user search
    e.preventDefault() // Stops pages refresh
    let trimmedSearch = search.trim() // Trims outer white space from the user's input
    if (trimmedSearch !== '') {
      setSearchMsg("Searching...")
      searchPoll(search) // Search for polls based on user input
      .then(output => {
        if (output.length !== 0) { // If there were results
          setSearchMsg("")
          setResults(output)
        }
        else { // If there were no matching polls
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
    resetSearch() // Resets the search text input field
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
        {results.map(result => { // Map search results to Result components
        return <ResultVote key={result.data.voteCode} result={result.data}/>
        })}
      </div>
    </div>
  )
}
export default Search;