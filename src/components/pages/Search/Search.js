import React, { Component } from 'react';
import ProfileCard from '../Profile/ProfileCard';
import SearchBar from '../../NavBar-Header/SearchBar';

class Search extends Component {        
  render() {
    return(
      <div>
        <SearchBar className="mainSearchBar"/>
        <div className="profileResultGrid">
          <ProfileCard/>
          <ProfileCard/>
          <ProfileCard/>
          <ProfileCard/>
          <ProfileCard/>
          <ProfileCard/>
          <ProfileCard/>
        </div>
      </div>
    )
  }
}
export default Search;