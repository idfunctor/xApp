if(process.env.NODE_ENV=="production"){
  module.exports={
    host: process.env.HOST || "",
    dbURI: process.env.dbURI,
    sessionSecret : process.env.sessionSecret,
    fb:{
      clientID: process.env.fbClientID,
      clientSecret: process.env.fbClientSecret,
      callbackURL: process.env.host+"/auth/facebook/callback",
      profileFields: ["id","displayName","photos"]
    },
    tw:{
      consumerKey       : process.env.twKey,
      consumerSecret    : process.env.twSecretKey,
      callbackURL       : process.env.host+"/auth/twitter/callback",
      profileFields: ["id","displayName","photos"]
    }
  }
}else{
  module.exports=require('./dev.json');
}
