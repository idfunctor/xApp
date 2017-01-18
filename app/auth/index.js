'use strict';
const passport = require('passport');
const config = require('../configDev');
const fbStrat = require('passport-facebook').Strategy;
const twStrat = require('passport-twitter').Strategy;
const h = require('../helpers');


module.exports = ()=>{
  passport.serializeUser(function(user, done) {
    done(null, user.id);
   // where is this user.id going? Are we supposed to access this anywhere?
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      h.sessionFinder(id)
        .then(user=>done(null, user))
          .catch(err=>console.log("error while deserialzing: "+err))
  });
  let authManager = (accessToken, refreshToken, profile, done)=>{
    //find a user in local db using profile.id
    h.finder(profile.id)
      .then(result=>{
        if (result){
          done(null, result);
        }else{
          //if not found in DB, then create agein
          h.creator(profile)
            .then(newUser=>{
              done(null, newUser);
            })
        }
        })
      .catch(err=>{console.log("Error during findOne: "+err)});
    //if found, return user data using done
    //if not, then create new user document in db and return
  };
  passport.use(new fbStrat(config.fb, authManager));
  passport.use(new twStrat(config.tw, authManager));
}
