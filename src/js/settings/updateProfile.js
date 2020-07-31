class Profile {
    constructor(){
        this._init();
        console.log(this.DOMlinks)
        this._clearForm();
    }

    _init(){
        this.DOMlinks = {
            clearFilds : {
                fio : document.querySelector("#fio"),
                date_birthday : document.querySelector("#date-birthday"),
                address : document.querySelector("#address"),
                number_phone : document.querySelector("#number-phone")
            },
            fio : document.querySelector("#fio"),
            date_birthday : document.querySelector("#date-birthday"),
            address : document.querySelector("#address"),
            errMsg : document.querySelector(".profile #errMsg"),
            msg : document.querySelector(".profile #msg"),
            telephone : {
                country_code : document.querySelector("#country-code"),
                number_phone : document.querySelector("#number-phone")
            }
        }


        document.querySelector("#update").addEventListener("click", e => this._handlerUpdate(e));
    }

    _handlerUpdate(e) {
        e.preventDefault();

        let DataUpdateProfile = {
            fio : this.DOMlinks.fio.value,
            date_birthday : this.DOMlinks.date_birthday.value,
            address : this.DOMlinks.address.value,
            phone : this.DOMlinks.telephone.country_code.value + this.DOMlinks.telephone.number_phone.value
        }

        if(!this._checkEmpty(DataUpdateProfile)){
            return this._updateProfile(DataUpdateProfile);
        }

        return this._showError("Fileds must be filled");
    }



    _delay(delay){
        return new Promise( resolve => setTimeout( () => { return resolve(true) }, delay))
    }

    _clearForm(){
    }

    _showError( errMsg ) {
        document.querySelector(".profile #errMsg").innerHTML = errMsg;
        this._delay(5000)
            .then( () => {
                document.querySelector(".profile #errMsg").innerHTML = "";
                this._clearForm();
            })
    }

    _showMessageSuccess( message ) {
        document.querySelector(".profile #msg").innerHTML = message;
        this._delay(5000)
            .then( () => {
                document.querySelector(".profile #msg").innerHTML = "";
                this._clearForm();
            })
    }



    _updateProfile( dataProfile ) {
        console.log(dataProfile);

        fetch("/settings/updateProfile", {
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                fio : dataProfile.fio,
                date_birthday : dataProfile.date_birthday,
                address : dataProfile.address,
                phone : dataProfile.phone
            })
        }).then( response => {
            return response.json();
        }).then( result => {
            console.log(result)
            if(result.status === "success") return this._showMessageSuccess(result.msg);
            return this._showError(result.msgErr);
        })
    }

    _checkEmpty(obj) {
        let empty = false;
        for( key in obj ) {
            if(obj[key].trim().length === 0 ) {
                empty = true;
            }
        }

        return empty;
    }
}

module.exports = new Profile();