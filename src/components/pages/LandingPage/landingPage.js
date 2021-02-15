import handsUp from '../../Images/handsUp.png';
import './landing.css'

function landingpage() {
  return(
    <main className="whoops">
      <img src = {handsUp}
        alt="Avatar"
        className="Avatar-img"
      />
      <div className="banner-text">
        <h1>Create and manage your own election.</h1>
        <hr/>
        <p>
          Info on our product .
        </p>
      </div>
    </main>
  )
}
export default landingpage;
