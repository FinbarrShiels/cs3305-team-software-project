import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SearchBar() {
  return(
    <div>
          <input type="search" placeholder="Search..."></input>
          <a href="/Search"><FontAwesomeIcon icon={['fas', 'search']}/></a>
    </div>
  )
}
export default SearchBar;
