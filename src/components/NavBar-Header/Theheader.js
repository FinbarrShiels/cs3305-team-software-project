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
                <Link to="/" className="logo">  
                <svg version="1.1" width="60px" height="60px" viewBox="0 0 131.65 149.04" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="linearGradient882" x1="79.005" x2="42.256" y1="207.72" y2="77.062" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#0ff" offset="0"/>
                        <stop stop-color="#00f" offset="1"/>
                        </linearGradient>
                    </defs>
                    <g transform="translate(-39.173 -73.98)" fill="none" stroke="url(#linearGradient882)" stroke-dashoffset="83.896" stroke-linecap="square" stroke-linejoin="round" stroke-miterlimit="3.8">
                        <rect x="42.256" y="77.062" width="125.49" height="142.88" ry="6.4256" opacity=".997" stroke-width="6.166"/>
                        <rect x="52.607" y="127.57" width="26.398" height="80.15" rx="1.1909" ry="0" opacity=".997" stroke-width="5.0274"/>
                        <rect x="91.99" y="97.237" width="26.398" height="110.58" rx="1.1909" ry="0" opacity=".997" stroke-width="5.905"/>
                        <rect x="131" y="151.01" width="26.398" height="56.42" rx="1.1909" ry="0" opacity=".997" stroke-width="4.218"/>
                    </g>
                </svg>
                </Link>
                {/* <div className="search">
                    <div className="searchBar">
                        <input type="search" placeholder="Search by Name..."/>
                        <a href="/Search"><FontAwesomeIcon icon={['fas', 'search']}/></a>
                    </div>
                </div> */}
                <div className="menuItems">
                    <li><Link to="/">Home</Link> </li>
                    {user !== null && <li><Link to="/profile"> Profile</Link></li>}
                    <li><Link to="/search"> Voting </Link></li>
                    <li><Link to="/aboutUs"> About Us </Link></li>
                    {user === null && <li><Link className="loginButton" to="/login">Log In</Link></li>}
                    {user === null && <li><Link className="signUpButton" to="/signUp"> Sign Up </Link></li>}
                    {user !== null && <li> <Link className="logOutButton" onClick={() => userLogOut()}> Log Out </Link></li>}
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