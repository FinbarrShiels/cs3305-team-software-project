import './Theheader.css';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./menuSelector.js"
import { Link } from 'react-router-dom';

function Theheader() {
    return(
        <header>
            <nav>
                <div className="menuIcon"><span>
                    <FontAwesomeIcon icon={['fas','bars']}/>
                    </span>
                </div>
                <div onClick={() => {window.location.href="/"}} className="logo"> ShowOfHands </div>
                <div className="search"><SearchBar/></div>
                <div className="menuItems">
                    <li><Link className="loginButton" to="/login">Log In</Link></li>
                    <li><Link className="signUpButton" to="/signUp"> Sign Up </Link></li>
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