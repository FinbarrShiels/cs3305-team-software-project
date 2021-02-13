import ProfileCard from '../Profile/ProfileCard';
import SearchBar from '../../NavBar-Header/SearchBar';
import VoteSearchCard from './VoteSearchCard';

function Search() {
  return(
    <div>
      <SearchBar className="mainSearchBar"/>
      <div className="profileResultGrid">
        <ProfileCard name="Name" location="Location" occupation="Occupation"/>
        <ProfileCard name="Name" location="Location" occupation="Occupation"/>
        <ProfileCard name="Name" location="Location" occupation="Occupation"/>
        <VoteSearchCard title="Title"organiser="Organiser" winner="Winner"/>
        <VoteSearchCard title="Title"organiser="Organiser" winner="Winner"/>
        <VoteSearchCard title="Title"organiser="Organiser" winner="Winner"/>
      </div>
    </div>
  )
}
export default Search;