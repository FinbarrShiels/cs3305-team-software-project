import './Theheader.css';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./menuSelector.js"

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
                    <li><a href="/">Home</a> </li>
                    <li><a href="/AboutUs"> About Us  </a></li>
                    <li><a href="/ContactUs">Contact Us</a></li>
                    <li><a className="loginButton" href="/login">Log In</a></li>
                    <li><a className="signUpButton" href="/signUp"> Sign Up </a></li>
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