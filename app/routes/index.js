'use strict'
const routeHelper = require('../helpers');
const passport = require('passport');
module.exports = ()=>{
  let routeList = {
    'get':{
      '/':(req,res,next) => {
        res.render('login',{
          appTitle: 'xApp'
        });
      },
      '/login':(req,res,next) => {
        res.render('login',{
          appTitle: 'xApp'
        });
      },
      '/rooms':(req,res,next) => {
        res.render('rooms',{
          user:req.user,
          appTitle: 'xApp'
        });
        // console.log(JSON.stringify(req.user))
      },
      '/chat':(req,res,next) => {
        res.render('chatroom',{
          appTitle: 'xApp'
        });
      },
      '/info': (req,res,next) => {
        res.send("<h1>testing info route</h1>");
      },
      //TESTING SESSION PERSISTENCE
      // '/getsesh': (req,res,next) => {
      //   res.send("<h1>fav color:</h1> "+req.session.favCol);
      // },
      // '/setsesh': (req,res,next) => {
      //   req.session.favCol = "black";
      //   res.send("<h1>Set! Test away!</h1>");
      // },
      '/social/fb': passport.authenticate('facebook'),
      '/auth/facebook/callback': passport.authenticate('facebook',{
        successRedirect: '/rooms',
        failureRedirect: '/'
      }),
      '/logout': (req,res,next)=>{
        console.log('logging out');
        req.logout();
        res.redirect('/');
      }
    },
    'post':{

    },
    'NA': (req,res,next)=>{
      res.status(404).sendFile(process.cwd()+'/views/404.htm');
    }
  }

  return routeHelper.router(routeList);
}
