import TeamMemberCard from './TeamMemberCard';
import "./AboutUs.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import avatar from "../../Images/avatar.png";
function AboutUs() {
  return(

    <div>
      <div className="memberCards">
        <TeamMemberCard 
           avatar=<img src={avatar}/>
          name={"Luke"}
          role="Team Lead/Front End"
          statement=""
          github=<a href="https://github.com/luketynan" ><FontAwesomeIcon icon={['fab', 'github']} size="2x"/></a>
        />
        <TeamMemberCard
            avatar=<img src={avatar}/>
          name="Finbarr"
          role="Front End (CSS)" 
          statement=""
          github=<a href="https://github.com/FinbarrShiels" ><FontAwesomeIcon icon={['fab', 'github']} size="2x"/></a>
        />
        <TeamMemberCard
            avatar=<img src={avatar}/>
          name="Jack"
          role="Front End (Design)" 
          statement=""
          github=<a href="https://github.com/jackboy-creator" ><FontAwesomeIcon icon={['fab', 'github']} size="2x"/></a>
        />
        <TeamMemberCard
            avatar=<img src={avatar}/>
          name="Diarmuid" 
          role="Backend" 
          statement=""
          github=<a href="https://github.com/diarmuidmckenna" ><FontAwesomeIcon icon={['fab', 'github']} size="2x"/></a>
        />
        <TeamMemberCard
            avatar=<img src={avatar}/>
            name={"Con"}
          role="Backend" 
          statement=""
          github=<a href="https://github.com/okeeffecon" ><FontAwesomeIcon icon={['fab', 'github']} size="2x"/></a>
        />
      </div>
      <div className="descriptionContainer">
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
          <a href="https://github.com/FinbarrShiels/cs3305-team-software-project"><FontAwesomeIcon className="icon" icon={['fab', 'github',]} size="2x"/>cs3305-team-software-project</a>
      </div>
    </div>
  )
}
export default AboutUs;