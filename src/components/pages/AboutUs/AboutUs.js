import React, { Component } from 'react';
import TeamMemberCard from './TeamMemberCard';

class AboutUs extends Component {
    render() {
      return(
        <div>
          <div className="memberCards">
            <TeamMemberCard 
              avatar="none" 
              name="Luke" 
              role="Team Lead / Front End (React)" 
              statement="some statement"
            />
            <TeamMemberCard 
              avatar="none" name="Finbarr" 
              role="Front End (CSS)" 
              statement="some statement"
            />
            <TeamMemberCard
              avatar="none" name="Jack" 
              role="Front End (Design)" 
              statement="some statement"
            />
            <TeamMemberCard 
              avatar="none" 
              name="Diarmuid" 
              role="Backend" 
              statement="some statement"
            />
            <TeamMemberCard 
              avatar="none" 
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
            GitHub Link
          </div>
        </div>
      )
    }
  }
  
  export default AboutUs;