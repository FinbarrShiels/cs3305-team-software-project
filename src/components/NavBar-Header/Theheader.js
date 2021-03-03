import './Theheader.css'
import SearchBar from './SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./menuSelector.js"
import { Link } from 'react-router-dom'
import { useUser, useUserSet } from "../../context/UserContext"

function Theheader() {

    const user = useUser();
    const userSet = useUserSet();

    return(
        <header>
            {user ? `Email: ${user.email}\tVerified: ${user.emailVerified}` : "No User"}
            <nav>
                <div className="menuIcon"><span>
                    <FontAwesomeIcon icon={['fas','bars']}/>
                    </span>
                </div>
                <div onClick={() => {window.location.href="/"}} className="logo"> ShowOfHands </div>
                <div className="search"><SearchBar/></div>
                <div className="menuItems">
                    <li><Link to="/">Home</Link> </li>
                    {user !== null && <li><Link to="/profile"> Profile </Link></li>}
                    <li><Link to="/voting"> Voting </Link></li>
                    <li><Link to="/aboutUs"> About Us </Link></li>
                    {user === null && <li><Link className="loginButton" to="/login"> Log In </Link></li>}
                    {user === null && <li><Link className="signUpButton" to="/signUp"> Sign Up </Link></li>}
                    {user !== null && <li onClick={() => {userSet(null)}}><Link to="/"> Log Out </Link></li>}
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