import "../scss/post.scss";
import "../static/favicon.png";
import "../static/logo-dark.png";
import "../font/Playfair_Display/PlayfairDisplay-Regular.ttf";
import "../font/Playfair_Display/PlayfairDisplay-Italic.ttf";
import "../font/Dosis/Dosis-Regular.ttf";
import "../font/Montserrat/Montserrat-Regular.ttf";


class Comment {
    constructor() {
        this._init();
    }

    _init(){
        document.querySelector("#send-comment").addEventListener("click", e => this._handlerSendComment(e));
    }

    _handlerSendComment(e) {
        if( document.querySelector("#text").value.trim().length !== 0 ){
            fetch("/create-comment", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    text : document.querySelector("#text").value,
                    hash : e.target.dataset.posthash
                })
            }).then( response => {
                return response.json();
            }).then( result => {
                console.log(result);
            })
        } else {
            this._showErr();
        }
        
    }

    _showErr( text ){

    }
}

const c = new Comment();