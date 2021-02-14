function ProfileCard() {
  return(
    <div>
      <div className="profileAvatar">
          Avatar
      </div>
      <div className="profileInfo">
          <div className="profileConnectedAccounts"> Connected Accounts </div>
          <span className="profileName"> Name </span>
          <span className="profileOccupation"> Occupation </span>
          <span className="profileLocation"> Based In </span>
          <a className="profileLink" href="/"> View Profile </a>
      </div>
    </div>
  )
}
export default ProfileCard;