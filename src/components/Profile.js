import { render } from '@testing-library/react';
import { useState } from 'react';

function getPage(page) {
    if (page === 1) {
        return (
            <div className="bioTab">
                <h2>BIO</h2>
                <button> Edit Bio </button>
            </div>
        )
    }
    else if (page === 2) {
        return (
            <div className="videosTab">
                <h2>Videos</h2>
            </div>
        )
    }
    else if (page === 3) {
        return (
            <div className="resultsTab">
                <h2>Results</h2>
            </div>
        )
    }
}

function Profile() { 
    const [ page, setPage ] = useState(() => {return 1});

    return(
      <div className="profileCard">
        <div className="left">
            <div className="profileAvatar"></div>
            <p className="profileName"> Name </p>
            <p className="profileOccupation"> Occupation </p>
            <p className="profileLocation"> Location </p>
            <div className="profileConnectedAccounts">
                <div> Twitter </div>
                <div> GitHub </div>
                <div> LinkedIn </div>
            </div>
            <button className="profileSettings"> Profile Settings </button>
        </div>
        <div className="right">
            <div className="tabOptions">
                <button onClick={() => {setPage(1)}}> Biography </button>
                <button onClick={() => {setPage(2)}}> Videos </button>
                <button onClick={() => {setPage(3)}}> Results </button>
            </div>
            {getPage(page)}
        </div>
      </div>
    )
}
export default Profile;