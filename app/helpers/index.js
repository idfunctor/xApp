const router = require('express').Router();
const db = require('../db');

let makeRoutes = (routeList, method)=>{
  for (let key in routeList){
    if (typeof routeList[key] === 'object' && routeList[key] !== null && !(routeList[key] instanceof Array)){
      makeRoutes(routeList[key], key); //here the routeList is Object with keys get and post
    } else {
        if(method==='get'){
          router.get(key, routeList[key]); //here the routeList is the Object with keys like '/','/rooms', etc
        }else if(method==='post'){
          router.post(key, routeList[key]);
        }else {
          router.use(routeList[key]);
        }
    }
  }
  return router;
};
//find user
let findData = (profileID)=>{
  // return db.userModel.find({
  //   'fbid': profileID
  // }).limit(1)
  return db.userModel.findOne({
    'fbid': profileID
  });
};
//create new user if not found
let createUser = profile=>{
  return new Promise((resolve,reject)=>{
    let newUser = new db.userModel({
      fbid: profile.id,
      name: profile.displayName,
      dp: profile.photos[0].value||""
    });
    newUser.save(err=>{
      if (err){
        console.log("error saving to db: "+err);
        reject(err);
      }else{
        resolve(newUser);
      }
    });
  });
}
//find user by Mongo ID to deserialize in session
let findById = id=>{
  return new Promise((resolve,reject)=>{
    db.userModel.findById(id, function(err, user) {
      if (err)
        reject(err)
      else
        resolve(user)
    });
  });
}

module.exports = {
  router : makeRoutes,
  finder: findData,
  creator: createUser,
  sessionFinder: findById
};
