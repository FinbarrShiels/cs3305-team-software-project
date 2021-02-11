import React, { Component } from 'react';
import ProfileCard from './ProfileCard';
import SearchBar from './SearchBar';

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