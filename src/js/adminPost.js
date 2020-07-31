import "../scss/adminPost.scss";
import "../static/favicon.png";
import "../static/logo-light.png";
import "../static/menu-white.png";
import "../static/category.png";
import "../static/dashboard.png";
import "../static/post.png";
import "../static/logout.png";
import "../font/Playfair_Display/PlayfairDisplay-Regular.ttf"
import "../font/Dosis/Dosis-Regular.ttf";
import "../font/Montserrat/Montserrat-Regular.ttf";
import "./grid/MasonryGrid";
import "../static/admin.jpg";
import "./menu/adminMenu";

class Post {
    constructor(){
        this.changeStatusbtn = [];
        this._init();
    }
    
    _init() {
        this.changeStatusbtn = document.querySelectorAll("#change-status");

        this.changeStatusbtn.forEach( btn => {
            btn.addEventListener("click", e => this._handlerChangeStatusPost(e))
        })

    }

    _handlerChangeStatusPost(e){
        let status = e.target.dataset.status;
        let hash = e.target.dataset.hash;
        console.log(status, hash)
        fetch("/admin/post/changeStatus", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                status : status,
                hash : hash
            })
        }).then( response => {
            return response.json();
        }).then( result => {
            if(result.status == "success") {
                this._changeDesignBtn(e.target);
            } else {
                this._error(result.errMsg);
            }
        })
    }

    _changeDesignBtn( btn ) {
        let status = btn.dataset.status;
        console.log(btn.dataset.status);
        btn.dataset.status = (status == 0) ? 1 : 0;
        btn.innerHTML = (status == 0) ? "delete" : "add";
        btn.className = (status == 0) ? "delete" : "add";
    }

    _error() {

    }

}

const p = new Post();
