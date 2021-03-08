import handsUp from '../../Images/vote.jpg';
import './landing.css'
import computer_vote from "../../Images/computer_vote.png"
import vote_card from "../../Images/vote_card.png"
function LandingPage() {
  return(
    <main className="whoops">
        <div className="heroImage">
            <div className="heroText">
                <h1><span>Show Of Hands</span></h1>
                <span className="lowerText">Organise - Vote - Elect</span>
                <a href="/signup"><button className="heroButton">Start Now</button></a>
            </div>
        </div>
        <div className="sectionContainer">
      <div className="sectionOne">
          <div className="leftImage">
              <img src={computer_vote} alt="computer_vote"/>
          </div>
          <div class="leftText">
              <h3>Vote for your candidate</h3>
              <p>Vote for your candidate from any connected device. Secure and simple. </p>
          </div>
      </div>
        <div className="sectionTwo">
            <div className="rightText">
                <h3>Setup polls or elections</h3>
                <p>Setup a poll or election for any reason. Work,Union or Class Rep</p>
            </div>
            <div className="leftImage">
                <img src={vote_card} alt="computer_vote"/>
            </div>
        </div>
        </div>
    </main>
  )
}
export default LandingPage;
