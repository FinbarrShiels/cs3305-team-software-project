window.addEventListener ('DOMContentLoaded', () => {
    const mBtn = document.querySelector(".menuIcon span");
    //const searchBtn = document.querySelector(".searchIcon");
    const canBtn = document.querySelector(".cancelIcon");
    const items = document.querySelector(".menuItems");
    // const search = document.querySelector(".search");
    mBtn.onclick = () => {
        items.classList.add("active");
        mBtn.classList.add("hide");
        //searchBtn.classList.add("hide");
        canBtn.classList.add("show");
    }
    canBtn.onclick = () => {
        items.classList.remove("active");
        mBtn.classList.remove("hide");
        //searchBtn.classList.remove("hide");
        // search.classList.remove("active");
        canBtn.classList.remove("show")
    }

    items.onclick = () =>{
        items.classList.remove("active");
        mBtn.classList.remove("hide");
        //searchBtn.classList.remove("hide");
        // search.classList.remove("active");
        canBtn.classList.remove("show")
    }
    /*
    searchBtn.onclick = () => {
        search.classList.add("active");
        searchBtn.classList.add("hide");
        canBtn.classList.add("show");
    }
     */
});
