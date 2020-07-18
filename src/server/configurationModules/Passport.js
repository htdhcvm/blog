const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const user = require("../database/User/User");


require("dotenv").config();

class Pass {
    constructor() {
        this.pass = passport;

        

        this.pass.serializeUser( (user, done) => {
            done(null, user.login);
        });

        this.pass.deserializeUser( (login, done) => {
            done(null, login);
        });

        this.pass.use("local-signin", new localStrategy( {
                usernameField : "email",
                passwordField : "password"
            },(username, password, done)=> {
                    user.getAllUser()
                        .then( usersCollection => {
                                let usertmp;
                                usersCollection.forEach( user => {
                                    if( user.login === username ) {
                                        usertmp = user;
                                    }
                                });
                                if(!usertmp) {
                                    throw new Error("Incorrect email")
                                }
                                return usertmp;
                            }, err => {
                                throw new Error(err);
                            }
                        ).then( user => {
                            bcrypt.compare(password, user.password)
                                .then( result => {
                                    if (!result)  throw new Error("Incorrect password");
                                    return done(null, user);
                                }, err => {
                                    console.log(err);
                                }).catch( error => {
                                    return done(null, false, { message : error.message});
                                });
                        }).catch( error => {
                            return done(null, false, { message : error.message});
                        })
            }));

        this.pass.use("local-signup", new localStrategy({
                usernameField : "email",
                passwordField : "password"
            },(username, password, done) => {
                
                if(username !== "" && password !== "") {
                    user.getAllUser()
                        .then( usersCollection => {
                            let check = false;
                            usersCollection.forEach( user => {
                                if( user.login === username ) {
                                    check = true;
                                }
                            });

                            if(check) {
                                throw new Error("Account has been created");
                            } 

                            return {
                                login : username,
                                password : password
                            };
                        }, err => {
                            throw new Error(err);
                        }).then( userApprove => {
                            bcrypt.hash(password, +process.env.SALT, (err, hash) => {
                                userApprove.password = hash;
                                user.insertUser(userApprove.login, userApprove.password)
                                    .then(
                                        (result) => {
                                            if(result) return done(null, userApprove);
                                        }, 
                                        (err) => {
                                            console.log(err);
                                        }
                                    );
                            });
                        }).catch( error => {
                            return done(null, false, {message : error.message})
                        })
                } else {
                    return done(null, false, {message : "Fields email and password is empty"});
                }
            }));
    }
}

module.exports = new Pass();


