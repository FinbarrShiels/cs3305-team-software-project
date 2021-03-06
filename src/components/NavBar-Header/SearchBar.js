import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./SearchBar.css";

function SearchBar() {
  return(
    <div className="searchBar">
          <input type="search" placeholder="Search by Name..."/>
          <a href="/Search"><FontAwesomeIcon icon={['fas', 'search']}/></a>
    </div>
  )
}
export default SearchBar;
