import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SearchBar extends Component {        
  render() {
    return(
      <div>
            <input type="search" placeholder="Search..."></input>
            <a href="/Search"><FontAwesomeIcon icon={['fas', 'search']}/></a>
      </div>
    )
  }
}
export default SearchBar;
