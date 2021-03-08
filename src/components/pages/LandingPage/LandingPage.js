import handsUp from '../../Images/vote.jpg';
import './landing.css'

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
      <div className="sectionOne">
          <div>Image</div>
          <div>Text</div>
      </div>
        <div className="sectionTwo">
            <div>Text</div>
            <div>Image</div>
        </div>
    </main>
  )
}
export default LandingPage;
