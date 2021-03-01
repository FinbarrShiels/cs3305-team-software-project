import './Theheader.css'
import SearchBar from './SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./menuSelector.js"
import { Link } from 'react-router-dom'
import { useUser, useUserToggle } from "../../context/UserContext"

function Theheader() {

    const user = useUser();
    const toggleUser = useUserToggle();

    return(
        <nav>
            <div className="menuIcon"><span>
                <FontAwesomeIcon icon={['fas','bars']}/>
                </span>
            </div>
            <div onClick={() => {window.location.href="/"}} className="logo"> ShowOfHands </div>
            <button onClick={toggleUser}>Toggle: User login state</button>
            <div className="menuItems">
                {user === null && <li><Link to="/login"> Login </Link></li>}
                {user === null && <li><Link to="/signup"> Sign Up </Link></li>}
                {user !== null && <li><Link to="/profile"> Profile </Link></li>}
                <li><Link to="/voting"> Voting </Link></li>
                <li><Link to="/aboutUs"> About Us </Link></li>
            </div>
            <div className="searchIcon"><span>
                <FontAwesomeIcon icon={['fas', 'search']}/>
                </span>
            </div>
            <div className="cancelIcon"><span>
                <FontAwesomeIcon icon={['fas', 'times']}/>
                </span>
            </div>
            <div className="search"><SearchBar/></div>
        </nav>
    );
}
export default Theheader