import React, {Component} from 'react';
import './App.css';
import Main from './components/main';
import Theheader from './components/NavBar-Header/Theheader';
import Thefooter from './components/Footer/Thefooter';

import initFontAwesome from "./components/FontAwesome/FontAwesome";
initFontAwesome();

class App extends Component {

  render() {
    return (


      <div className="container">                           {/*Container inherits 100% height from body* in index.css*/}
        <div className="header">
          <Theheader/>
        </div>
        <div className="body">
          <Main/>
        </div>
        <div className="footer">
          <Thefooter/>
        </div>
      </div>
    );
  }
}

export default App;
