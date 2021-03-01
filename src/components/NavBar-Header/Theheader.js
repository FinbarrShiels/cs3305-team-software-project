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
                <div className="menuItems">
                    <li><Link to="/login"> Login </Link></li>
                    <li><Link to="/signup"> Sign Up </Link></li>
                    <li><Link to="/profile"> Profile</Link></li>
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
        </header>
    );
}
export default Theheader