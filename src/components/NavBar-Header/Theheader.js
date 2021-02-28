import './Theheader.css';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./menuSelector.js"
import { Link } from 'react-router-dom';

function Theheader() {
    return(
        <header>
            <nav>
                <div class="menuIcon"><span>
                    <FontAwesomeIcon icon={['fas','bars']}/>
                    </span>
                </div>
                <div onClick={() => {window.location.href="/"}} class="logo"> ShowOfHands </div>
                <div class="menuItems">
                    {/* <li><a href="/login"> Log In  </a></li> */}
                    <li><Link to="/login"> Login </Link></li>
                    <li><Link to="/signup"> Sign Up </Link></li>
                    <li><Link to="/profile"> Profile</Link></li>
                    <li><Link to="/voting"> Voting </Link></li>
                    <li><Link to="/aboutUs"> About Us </Link></li>
                </div>
                <div class="searchIcon"><span>
                    <FontAwesomeIcon icon={['fas', 'search']}/>
                    </span>
                </div>
                <div class="cancelIcon"><span>
                    <FontAwesomeIcon icon={['fas', 'times']}/>
                    </span>
                </div>
                <div class="search"><SearchBar/></div>
            </nav>
        </header>
    );
}
export default Theheader