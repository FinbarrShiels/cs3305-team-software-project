import React, { Component } from 'react';

class SearchBar extends Component {        
  render() {
    return(
      <div>
            <input type="text" placeholder="User/Vote"></input>
            <a href="/Search"><input type="submit" value="Search"></input></a>
      </div>
    )
  }
}
export default SearchBar;
