import './Theheader.css'
import SearchBar from './SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./menuSelector.js"
import { Link } from 'react-router-dom'
import { useUser } from "../../context/UserContext"

function Theheader() {

    const user = useUser();

    return(
        <header>
            <nav>
                <div className="menuIcon"><span>
                    <FontAwesomeIcon icon={['fas','bars']}/>
                    </span>
                </div>
                <Link to="/" className="logo"> ShowOfHands </Link>
                <div className="search"><SearchBar/></div>
                <div className="menuItems">
                    <li><Link to="/">Home</Link> </li>
                    {user !== null && <li><Link to="/profile"> Profile</Link></li>}
                    <li><Link to="/voting"> Voting </Link></li>
                    <li><Link to="/aboutUs"> About Us </Link></li>
                    {user === null && <li><Link className="loginButton" to="/login">Log In</Link></li>}
                    {user === null && <li><Link className="signUpButton" to="/signUp"> Sign Up </Link></li>}
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