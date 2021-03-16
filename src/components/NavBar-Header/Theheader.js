import './Theheader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./menuSelector.js"
import { NavLink } from 'react-router-dom'
import { useUser, useUserLogOut } from "../../context/UserContext"
import "../pages/Search/SearchBar.css"
function Theheader() {

    const user = useUser();
    const userLogOut = useUserLogOut();

    return(
        <header>
            <nav>
                <NavLink to="/">
                <svg className="logo" width="80" height="80" data-name="Layer 1" version="1.1" viewBox="0 0 63.546 95.922" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                    <linearGradient id="linear-gradient" x1="149.07" x2="149.07" y1="71.303" y2="167.15" gradientTransform="translate(-117.3 -84.928)" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#04ecfb" offset="0"/>
                        <stop stopColor="#9346c7" offset="1"/>
                    </linearGradient>
                    </defs>
                    <path className="cls-1" d="m27.898 3.8748a3.886 3.886 0 0 1 3.8747-3.8748 3.886 3.886 0 0 1 3.8747 3.8748v60.331a3.886 3.886 0 0 1-3.8747 3.8745 3.886 3.886 0 0 1-3.8747-3.8745zm-13.949 6.6663a3.8747 3.8747 0 0 1 7.7494 0v53.512a10.174 10.174 0 0 0 9.9179 10.226c0.0522 7e-4 0.1045 1e-3 0.1565 1e-3a10.086 10.086 0 0 0 10.074-10.074v-53.665a3.8747 3.8747 0 0 1 7.7494 0v53.468a17.951 17.951 0 0 1-17.72 18.02h-0.104a17.843 17.843 0 0 1-17.824-17.824zm49.597 53.665a31.773 31.773 0 0 1-63.546 0v-20.97a3.8748 3.8748 0 1 1 7.7495 0v20.97a24.05 24.05 0 0 0 24.023 24.023h0.068a24.174 24.174 0 0 0 23.955-24.256v-39.328a3.875 3.875 0 1 1 7.75 0z" fill="url(#linear-gradient)"/>
                </svg>
                </NavLink>
                {/* <div className="search">
                    <div className="searchBar">
                    <input type="search" placeholder="Search by Name..."/>
                    <a href="/Search"><FontAwesomeIcon icon={['fas', 'search']}/></a>
                    </div>
                </div> */}
                <div className="menuIcon"><span>
                    <FontAwesomeIcon icon={['fas','bars']} size="2x"/>
                    </span>
                </div>
                <div className="menuItems">
                    <li><NavLink exact={true} to="/">Home</NavLink></li>
                    {user !== null && <li><NavLink to="/profile"> Profile </NavLink></li>}
                    <li><NavLink to="/search"> Voting </NavLink></li>
                    <li><NavLink to="/aboutUs"> About Us </NavLink></li>
                    {user === null && <li><NavLink className="loginButton" to="/login">Log In</NavLink></li>}
                    {user === null && <li><NavLink className="signUpButton" to="/signUp"> Sign Up </NavLink></li>}
                    {user !== null && <li><NavLink className="logOutButton" to="/logip" onClick={() => userLogOut()}> Log Out </NavLink></li>}
                    {user !== null && user.fname && user.sname && <p><NavLink to="/profile"> {`${user.fname} ${user.sname}`} </NavLink></p>}
                </div>
                {/* <div className="searchIcon"><span>
                    <FontAwesomeIcon icon={['fas', 'search']}/>
                    </span>
                </div> */}
                <div className="cancelIcon"><span>
                    <FontAwesomeIcon icon={['fas', 'times']} size="2x"/>
                    </span>
                </div>
            </nav>
        </header>
    );
}
export default Theheader