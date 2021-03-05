import './App.css'
import Main from './components/main'
import Theheader from './components/NavBar-Header/Theheader'
import Thefooter from './components/Footer/Thefooter'
import initFontAwesome from "./components/FontAwesome/FontAwesome"
import UserProvider from "./context/UserContext"
initFontAwesome();


function App() {

  return (
    <div className="container">                           {/*Container inherits 100% height from body* in index.css*/}
    <UserProvider>
      <div className="header">
          <Theheader/>
      </div>
      <div className="body">
        <Main/>
      </div>
      <div className="footer">
        <Thefooter/>
      </div>
    </UserProvider>
    </div>
  );
}
export default App;
