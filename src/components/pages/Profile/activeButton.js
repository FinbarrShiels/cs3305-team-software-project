if (window.location.pathname === "src/components/pages/Profile/Profile.js"){
    window.addEventListener ('DOMContentLoaded', () => {
        const buttonBio = document.querySelector(".buttonBio");
        const buttonElection = document.querySelector(".buttonElection");
        const buttonInvites = document.querySelector(".buttonInvites");
        buttonBio.onclick = () =>{
            buttonBio.classList.add('active');
            buttonElection.classList.remove('active');
            buttonInvites.classList.remove('active')
        }
        buttonElection.onclick = () =>{
            buttonElection.classList.add('active');
            buttonBio.classList.remove('active');
            buttonInvites.classList.remove('active')
        }
        buttonInvites.onclick = () =>{
            buttonInvites.classList.add('active');
            buttonBio.classList.remove('active');
            buttonElection.classList.remove('active')
        }
    });
}
