class ChangePassword {
    constructor(){
        this._init();
        this._clearForm();
    }

    _init(){
        this.DOMLinks = {
            oldPassword : document.querySelector("#old-password"),
            newPassword : document.querySelector("#new-password"),
            confirmNewPassword : document.querySelector("#confirm-new-password"),
            btnChange : document.querySelector("#change"),
            errMsg : document.querySelector(".password #errMsg"),
            msg : document.querySelector(".password #msg")
        }

        this._initHandler();
    }
    
    _initHandler() {
        this.DOMLinks.btnChange.addEventListener("click", e => this._handlerChange(e));
    }

    _handlerChange(e) {
        e.preventDefault();

        let ValueForm = {
            oldPassword : this.DOMLinks.oldPassword.value,
            newPassword : this.DOMLinks.newPassword.value,
            confirmPassword : this.DOMLinks.confirmNewPassword.value
        }

        for( itemForm in ValueForm) {
            if( ValueForm[itemForm].trim().length === 0 ) {
                return this._showError("Error: all field have to fill");
            }
        }

        if(ValueForm.newPassword !== ValueForm.confirmPassword) return this._showError("Error: Fields new password and confirm password should be equal");

        return this._sendRequestOnChangePassword(ValueForm);
    }

    _delay(delay){
        return new Promise( resolve => setTimeout( () => { return resolve(true) }, delay))
    }

    _clearForm(){
        for( formInp in this.DOMLinks){
            if(this.DOMLinks[formInp].getAttribute("type") === "password") {
                this.DOMLinks[formInp].value = "";
            }
        }

    }

    _showError( errMsg ) {
        this.DOMLinks.errMsg.innerHTML = errMsg;
        this._delay(5000)
            .then( () => {
                this.DOMLinks.errMsg.innerHTML = "";
                this._clearForm();
            })
    }

    _showMessageSuccess( msg) {
        this.DOMLinks.msg.innerHTML = msg;
        this._delay(5000)
            .then( () => {
                this.DOMLinks.msg.innerHTML = "";
                this._clearForm();
            })
    }

    _sendRequestOnChangePassword(formVal) {
        fetch("/settings/changePassword", {
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                oldPassword : formVal.oldPassword,
                newPassword : formVal.newPassword
            })
        }).then( response => {
            return response.json();
        }).then( result => {
            if(result.status === "success") return this._showMessageSuccess(result.msg);
            return this._showError(result.msgErr);
        })
    }
}

module.exports = new ChangePassword();