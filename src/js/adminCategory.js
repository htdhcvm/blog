import "../scss/adminCategory.scss";
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

class Category {
    constructor() {
        this.arrayListItemCategory = [];
        this._initHandlers();
    }

    _initHandlers() {
        this.setArrayListItemCategory();

        document.querySelector("#send-category").addEventListener("click", e => this._handlerAddCategory(e));

        this.arrayListItemCategory.forEach( category => {
            category.addEventListener("click", e => this._handlerDeleteCategory(e));
        })
    }

    setArrayListItemCategory() {
        this.arrayListItemCategory =  document.querySelectorAll(".item");
    }

    renderNewCategory(category) {
        document.querySelector("#category-name").value = "";
        const listCategory = document.querySelector("#list-category");
        const item = document.createElement("div");
        item.className = "item";
        item.dataset.id = category.id;
        item.innerHTML = category.name;
    
        item.addEventListener("click", e => this._handlerDeleteCategory(e));

        listCategory.appendChild(item);
    }

    _handlerAddCategory(e) {
        e.preventDefault();
        if( document.querySelector("#category-name").value.trim().length !== 0 ) {
            let categoryName = document.querySelector("#category-name").value;
            fetch("/admin/category/add", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({ category : categoryName})
            }).then( response => {
                return response.json();
            }).then(result => {
                console.log(result);
                if(result.status === "ok") {
                    this.renderNewCategory({
                        id : result.data,
                        name : categoryName
                    });
                    this.setArrayListItemCategory();
                } else {
                    this.showErr(result.errMsg);
                }
            })
        }
    }
    
    _handlerDeleteCategory(e) {
        const id = e.target.dataset.id;

        fetch("/admin/category/delete", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ idCategory : id})
        }).then( response => {
            return response.json()
        }).then(result => {
            console.log(result);
            if(result.status === "success") {
                this._reRenderListCategory( id );
                this.setArrayListItemCategory();
            } else {
                this.showErr(result.errMsg);
            }
        })
    }

    _reRenderListCategory(id){
        this.arrayListItemCategory.forEach( item => {
            if(item.dataset.id == id) {
                item.remove();
            }
        })
    }

    showErr( msg ) {

    }
}

const category = new Category();
