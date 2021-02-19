import ResultProfile from './ResultProfile';
import SearchBar from '../../NavBar-Header/SearchBar';
import VoteSearchCard from './ResultVote';
import "./Search.css";
function Search() {
  return(
    <div className="searchContainer">
        <div className="mainSearchBar">
      <SearchBar />
        </div>
      <div className="profileResultGrid">
        <ResultProfile name="Name" location="Location" occupation="Occupation"/>
        <ResultProfile name="Name" location="Location" occupation="Occupation"/>
        <ResultProfile name="Name" location="Location" occupation="Occupation"/>
        <VoteSearchCard title="Title"organiser="Organiser" winner="Winner"/>
        <VoteSearchCard title="Title"organiser="Organiser" winner="Winner"/>
        <VoteSearchCard title="Title"organiser="Organiser" winner="Winner"/>
      </div>
    </div>
  )
}
export default Search;