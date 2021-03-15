import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <div>
            <h1> Sorry, we couldn't find the page you were looking for</h1>           
            <h2> Click <Link to="/"> here </Link> to be taken back to the homepage</h2>
        </div>
    )
}
export default PageNotFound