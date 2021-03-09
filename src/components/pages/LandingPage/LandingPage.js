import { Link } from 'react-router-dom'
import './landing.css'
import { useUser } from '../../../context/UserContext'

function LandingPage() {

  const user = useUser()

  return(
    <main className="whoops">
        <div className="heroImage">
            <div className="heroText">
                <h1><span>Show Of Hands</span></h1>
                <span className="lowerText">Organise - Vote - Elect</span>
                <div>
                  { user === null && <Link to="/signup"><button className="heroButton"> Start Now </button></Link> }
                  { user !== null && <Link to="/organise"><button className="heroButton"> Organise your own vote </button></Link> }
                  { user !== null && <Link to="/voting"><button className="heroButton"> Find a vote </button></Link> }
                </div>
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
