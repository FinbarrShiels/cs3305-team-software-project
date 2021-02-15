import TeamMemberCard from './TeamMemberCard';
import "./AboutUs.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
function AboutUs() {
  return(
    <div>
      <div className="memberCards">
        <TeamMemberCard 
          avatar=""
          name="Luke" 
          role="Team Lead / Front End (React)" 
          statement="some statement"
        />
        <TeamMemberCard 
          avatar="" name="Finbarr"
          role="Front End (CSS)" 
          statement="some statement"
        />
        <TeamMemberCard
          avatar="" name="Jack"
          role="Front End (Design)" 
          statement="some statement"
        />
        <TeamMemberCard 
          avatar=""
          name="Diarmuid" 
          role="Backend" 
          statement="some statement"
        />
        <TeamMemberCard 
          avatar=""
          name="Con" 
          role="Backend" 
          statement="some statement"
        />
      </div>
      <div>
        <div className="description">
          <h2>Description</h2>
          <p>Text</p>
        </div>
        <div className="unique">
          <h2>Unique</h2>
          <p>Text</p>
        </div>
      </div>
      <div className="projectLinks">
          <h5><FontAwesomeIcon className="icon" icon={['fab', 'github',]} size="2x"/>cs3305-team-software-project</h5>
      </div>
    </div>
  )
}
export default AboutUs;