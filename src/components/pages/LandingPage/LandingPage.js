import handsUp from '../../Images/handsUp.png';
import './landing.css'

function LandingPage() {
  return(
    <main className="whoops">
      <img src = {handsUp}
        alt="Avatar"
        className="Avatar-img"
      />
      <div className="banner-text">
        <h1>Show Of Hands</h1>
        <hr/>
        <p>
          Create your own election now!
        </p>
      </div>
    </main>
  )
}
export default LandingPage;
