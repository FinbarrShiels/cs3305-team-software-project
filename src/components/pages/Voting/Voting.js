import React, { Component } from 'react';
import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton } from 'react-mdl';


class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }

  toggleCategories() {

    if(this.state.activeTab === 0){
      return(
        <div className="projects-grid">
          <Card shadow={5} style={{minWidth: '450', margin: 'auto'}}>
            <CardTitle style={{color: 'orange', width:'300px',height: '300px' ,background:'url(https://images.vexels.com/media/users/3/151870/isolated/preview/8b1a89d3f271913146d4cd63f3920464-medical-checklist-stroke-icon-by-vexels.png) center/cover'}} >Organizer</CardTitle>
            <CardText>
              This is for the Organizer.
            </CardText>
            <CardActions border>
              <Button colored>Something Organizer Specific</Button>
              <Button colored>Something Organizer Specific</Button>
              <Button colored>Something Organizer Specific</Button>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
              <IconButton name="share" />
            </CardMenu>
          </Card>
          </div>
      )}


    else if(this.state.activeTab === 1) {
      return (
        <div>
            <Card shadow={5} style={{minWidth: '450', margin: 'auto'}}>
            <CardTitle style={{color: 'orange',width:'300px', height: '300px', background: 'url(https://image.flaticon.com/icons/png/512/95/95375.png) center / cover'}} >Voter</CardTitle>
            <CardText>
              This is for the Voters
            </CardText>
            <CardActions border>
              <Button colored>Something Voter Specific</Button>
              <Button colored>Something Voter Specific</Button>
              <Button colored>Something Voter Specific</Button>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
              <IconButton name="share" />
            </CardMenu>
          </Card>
        </div>
        )
      } 

      else if(this.state.activeTab === 2) {
        return (
          <div>

            <Card shadow={5} style={{minWidth: '450', margin: 'auto'}}>
            <CardTitle style={{color: 'orange', height: '300px', width:'300px', background: 'url(https://image.flaticon.com/icons/png/128/2107/2107820.png) center / cover'}} >Candidate</CardTitle>
            <CardText>
              This is for the Candidates
            </CardText>
            <CardActions border>
              <Button colored>Something Candidate Specific</Button>
              <Button colored>Something Candidate Specific</Button>
              <Button colored>Something Candidate Specific</Button>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
              <IconButton name="share" />
            </CardMenu>
          </Card>

          </div>
        )
      }


  }

  render() {
    return(
      <div>
        <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })}ripple>
          <Tab>Organizer</Tab>
          <Tab>Voter</Tab>
          <Tab>Candidates</Tab>
        </Tabs>


          <Grid>
            <Cell col={12}>
              <div className="content">{this.toggleCategories()}</div>
            </Cell>
          </Grid>


      </div>
    )
  }
}

export default Voting;