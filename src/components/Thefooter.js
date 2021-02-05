import React from 'react'
import './footer.css';                                  /* Can modify as much as you like*/

function Thefooter() {
    return(
        
        <footer>
            <div>
                <nav className="my-footer">
                <div className="icons">
                <a href="https://facebook.com" rel="noopener noreferrer"  target= "_blank">
                    <i className = "fa fa-facebook" aria-hidden="true"/>
                </a>

                <a href="https://github.com/FinbarrShiels/cs3305-team-software-project" rel="noopener noreferrer"  target= "_blank">
                    <i className = "fa fa-github" aria-hidden="true"/>
                </a>

                <a href="https://www.youtube.com" rel="noopener noreferrer"  target= "_blank">
                    <i className = "fa fa-youtube" aria-hidden="true"/>
                </a>

                <a href="https://google.com" rel="noopener noreferrer"  target= "_blank">
                    <i className = "fa fa-google" aria-hidden="true"/>
                </a>
                </div>
                </nav>
            </div>
        </footer>
    )
}

export default Thefooter