
let btnMenu = document.querySelectorAll(".settings #menu-items li");
let contentItems = document.querySelectorAll(".content-item");

btnMenu.forEach( btn => {
    btn.addEventListener("click", (e) => {
        contentItems.forEach( content => {
            content.className += " hide";

            if(content.dataset.content === e.target.dataset.item) {
                content.classList.remove("hide");
            }
        })
    })
})
