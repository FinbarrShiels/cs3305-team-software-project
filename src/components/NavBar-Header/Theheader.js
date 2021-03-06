import './Theheader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./menuSelector.js"
import { Link } from 'react-router-dom'
import { useUser, useUserLogOut } from "../../context/UserContext"
import "../pages/Search/SearchBar.css"

function Theheader() {

    const user = useUser();
    const userLogOut = useUserLogOut();

    return(
        <header>
            <nav>
                <div className="menuIcon"><span>
                    <FontAwesomeIcon icon={['fas','bars']}/>
                    </span>
                </div>
                <Link to="/" className="logo"> ShowOfHands </Link>
                <div className="search">
                    <div className="searchBar">
                        <input type="search" placeholder="Search by Name..."/>
                        <a href="/Search"><FontAwesomeIcon icon={['fas', 'search']}/></a>
                    </div>
                </div>
                <div className="menuItems">
                    <li><Link to="/">Home</Link> </li>
                    {user !== null && <li><Link to="/profile"> Profile</Link></li>}
                    <li><Link to="/search"> Voting </Link></li>
                    <li><Link to="/aboutUs"> About Us </Link></li>
                    {user === null && <li><Link className="loginButton" to="/login">Log In</Link></li>}
                    {user === null && <li><Link className="signUpButton" to="/signUp"> Sign Up </Link></li>}
                    {user !== null && <li className="logOutButton" onClick={() => userLogOut()}> Log Out </li>}
                </div>
                <div className="searchIcon"><span>
                    <FontAwesomeIcon icon={['fas', 'search']}/>
                    </span>
                </div>
                <div className="cancelIcon"><span>
                    <FontAwesomeIcon icon={['fas', 'times']}/>
                    </span>
                </div>
            </nav>
        </header>
    );
}
export default Theheader