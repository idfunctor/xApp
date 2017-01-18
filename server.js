'use strict';
const express = require('express');
const app = express();
const xm = require('./app');
const passport = require('passport');
app.use(express.static('public'));



app.set('port', process.env.PORT || 3000);
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.use(xm.session);
app.use(passport.initialize());
app.use(passport.session());



app.use('/', xm.router);


app.listen(app.get('port'), ()=>console.log("server running at port: "+ app.get('port')));
