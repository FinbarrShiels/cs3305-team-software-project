import React, { useEffect } from 'react'
import queryString from 'query-string'
import { useHistory } from 'react-router';
import { useState } from 'react/cjs/react.development';

function Vote() {

    const location = useHistory().location;
    const query = queryString.parse(location.search); // returns the query object
    const [ currentVote, setCurrentVote ] = useState()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const poll = params.get('poll')
        setCurrentVote(poll)
    }, [])

    return (
        <div className="voteContainer">
            {console.log(query.poll)}
            {`Current Vote: ${currentVote}`}
        </div>
    )
}
export default Vote
