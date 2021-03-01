if (window.location.pathname === "src/components/pages/Profile/ProfileCard.js"){
    window.addEventListener ('DOMContentLoaded', () => {
        const buttonBio = document.querySelector(".buttonBio");
        const buttonElection = document.querySelector(".buttonElection");
        buttonBio.classList.add('active');
        buttonBio.onclick = () =>{
            buttonBio.classList.add('active');
            buttonElection.classList.remove('active')
        }
        buttonElection.onclick = () =>{
            buttonElection.classList.add('active');
            buttonBio.classList.remove('active');
        }
    });
}
