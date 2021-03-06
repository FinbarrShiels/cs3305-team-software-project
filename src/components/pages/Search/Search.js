import ResultProfile from './ResultProfile';
import ResultVote from './ResultVote';
import "./Search.css";
import { useReducer, useState } from 'react'
import { useInput } from '../../../customHooks/form-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const fakeResults = [
  {
    type: "vote",
    data: {
      title: "Some cool title",
      organiser: "The man himself",
      winner: "ME!",
      voteCode: "gf7hd8"
    }
  },
  {
    type: "vote",
    data: {
      title: "Another cool title",
      organiser: "The woman herself",
      winner: "them...",
      voteCode: "sd4jh7"
    }
  },
  {
    type: "vote",
    data: {
      title: "Definitely a cool title",
      organiser: "No idea",
      winner: "Doesn't matter",
      voteCode: "odiuyg22"
    }
  },
  {
    type: "vote",
    data: {
      title: "A vote for testing",
      organiser: "Nobody",
      winner: "I don't have to say it again",
      voteCode: "1"
    }
  },
  {
    type: "vote",
    data: {
      title: "A vote for testing",
      organiser: "Nobody",
      winner: "I don't have to say it again",
      voteCode: "2"
    }
  },
  {
    type: "vote",
    data: {
      title: "A vote for testing",
      organiser: "Nobody",
      winner: "I don't have to say it again",
      voteCode: "3"
    }
  },
  {
    type: "vote",
    data: {
      title: "A vote for testing",
      organiser: "Nobody",
      winner: "I don't have to say it again",
      voteCode: "4"
    }
  },
  {
    type: "vote",
    data: {
      title: "A vote for testing",
      organiser: "Nobody",
      winner: "I don't have to say it again",
      voteCode: "5"
    }
  },
  {
    type: "vote",
    data: {
      title: "A vote for testing",
      organiser: "Nobody",
      winner: "I don't have to say it again",
      voteCode: "6"
    }
  },
  {
    type: "vote",
    data: {
      title: "A vote for testing",
      organiser: "Nobody",
      winner: "I don't have to say it again",
      voteCode: "7"
    }
  },
  {
    type: "vote",
    data: {
      title: "A vote for testing",
      organiser: "Nobody",
      winner: "I don't have to say it again",
      voteCode: "8"
    }
  },
  {
    type: "vote",
    data: {
      title: "A vote for testing",
      organiser: "Nobody",
      winner: "I don't have to say it again",
      voteCode: "9"
    }
  },
  {
    type: "vote",
    data: {
      title: "A vote for testing",
      organiser: "Nobody",
      winner: "I don't have to say it again",
      voteCode: "10"
    }
  }
]

// const ACTIONS = {
//   ADD_RESULT: 'add_result'
// }

// function reducer(results, action) {
//   console.log(results)
//   console.log(`Action type: ${action.type}`)
//   console.log(`Payload: ${action.payload}`)
//   return results
// }

function Search() {
  
  const [ results, setResults ] = useState([])
  const { value:search, bind:bindSearch, reset:resetSearch } = useInput('')
  const [ searchMsg, setSearchMsg ] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    let trimmedSearch = search.trim()
    if (trimmedSearch !== '') {
      console.log(`SEARCHING: ${trimmedSearch}`)
      setSearchMsg("Searching...")
      // Wait for response from server with search results
      // Then use reducer to render components based on returned array of polls
      // pass result of query into reducer as payload
      setTimeout(() => {
        setResults(fakeResults)
      }, 2000)
    }
    else {
      console.log('Search field was empty')
    }
    resetSearch()
  }
  
  return(
    <div className="searchContainer" onSubmit={handleSearch}>
        <div className="mainSearchBar">
          <form className="searchBar">
              <input type="search" placeholder="Search for a vote..." {...bindSearch}/>
              <FontAwesomeIcon icon={['fas', 'search']} onClick={handleSearch}/>
          </form>
        </div>
      <div className="profileResultGrid">
        {console.log("RESULTS:")}
        {console.log(results)}
        {
        (results.length === 0) ?
          <h2> {searchMsg} </h2>
        :
          results.map(result => {
            return <ResultVote key={result.data.voteCode} title={result.data.title} organiser={result.data.organiser} winner={result.data.winner}/>
          })
        }
      </div>
    </div>
  )
}
export default Search;