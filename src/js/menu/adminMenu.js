
class Menu {
    constructor() {
        this.state = false;
    }

    toggleAdminMenu() {
        if(!this.state) {
            document.querySelector("#menu-toggle").className = "hide-menu";
            this.state = !this.state;
        } else {
            document.querySelector("#menu-toggle").className = "admin";
            this.state = !this.state;
        }
    }
}

const m = new Menu();

document.querySelector("#toggle-menu").addEventListener("click", () => m.toggleAdminMenu() );
