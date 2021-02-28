import './Theheader.css';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./menuSelector.js"

function Theheader(props) {
    return(
        <header>
            <nav>
                <div class="menuIcon"><span>
                    <FontAwesomeIcon icon={['fas','bars']}/>
                    </span>
                </div>
                <div onClick={() => {window.location.href="/"}} class="logo"> ShowOfHands </div>
                <div class="menuItems">
                    {(!props.loggedIn) && <li><a href="/login"> Log In  </a></li>}
                    {(!props.loggedIn) && <li><a href="/signUp"> Sign Up </a></li>}
                    {(props.loggedIn) && <li><a href="/profile"> Profile </a></li>}
                    <li><a href="/voting"> Voting </a></li>
                    <li><a href="/AboutUs"> About Us  </a></li>
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