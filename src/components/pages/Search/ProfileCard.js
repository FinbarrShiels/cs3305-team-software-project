function ProfileCard(props) {        
  return(
    <div>
      <div className="profileAvatar">
          Avatar
      </div>
      <div className="profileInfo">
          <div className="profileConnectedAccounts"> Connected Accounts </div>
          <span className="profileName"> {props.name} </span>
          <span className="profileOccupation"> {props.occupation} </span>
          <span className="profileLocation"> {props.location} </span>
          <a className="profileLink" href="/"> View Profile </a>
      </div>
    </div>
  )
}
export default ProfileCard;