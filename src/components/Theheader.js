
import React from 'react';
import './Theheader.css';

    function Theheader() {
        return(
            <header>
                <div >
                    <nav className="The-header">
                    <ul>
                        <li><a href="/"> Show Of Hands </a></li>
                    <div className="right">
                        <li><a href="/login"> Log In  </a></li>
                        <li><a href="/signUp"> Sign Up </a></li>
                        {/* <li><a href="/Voting"> Voting </a></li> */}
                        <li><a href="/AboutUs"> About Us  </a></li>
                        {/* <li><a href="/AnonymousV"><i className="fa fa-user-secret" aria-hidden="true"></i></a></li> */}
                    </div>
                    </ul>
                    </nav>

                </div>
            </header>
        );
    }
    
export default Theheader