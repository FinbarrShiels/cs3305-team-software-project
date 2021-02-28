import './App.css';
import Main from './components/main';
import Theheader from './components/NavBar-Header/Theheader';
import Thefooter from './components/Footer/Thefooter';
import { useState } from 'react';
import initFontAwesome from "./components/FontAwesome/FontAwesome";
initFontAwesome();

function App() {

  const [ loggedIn, setLoggedIn ] = useState(false);

  return (
    <div className="container">                           {/*Container inherits 100% height from body* in index.css*/}
      <div className="header">
        <Theheader loggedIn={loggedIn}/>
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
export default App;
