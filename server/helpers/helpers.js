function isEmptyObj( obj ) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}


function getAuthDataOnAuth(req){
    if( isEmptyObj(req.session.passport) ) {
        if(req.isAuthenticated()) {
            return {
                status : true,
                name : req.session.passport.user.login
            }
        } else {
            return {
                status : false
            }
        }
    
    } else {
        if(req.isAuthenticated() & req.session.passport.user.type !== "admin") {
            return {
                status : true,
                name : req.session.passport.user.login
            }
        } else {
            return {
                status : false
            }
        }
    }
   
}

module.exports = { 
    getAuthDataOnAuth : getAuthDataOnAuth,
    isEmptyObj : isEmptyObj
}