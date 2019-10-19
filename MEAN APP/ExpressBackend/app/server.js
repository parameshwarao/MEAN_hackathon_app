const express = require('express');
const fs= require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const globalErrorMiddleware = require ('./middlewares/errorHandler');
const routeLoggerMiddleware = require('./middlewares/routeLogger');

//app config
const appConfig = require('../config/appConfig');


//Express instance

const app = express();
//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(globalErrorMiddleware._errorHandler);
app.use(routeLoggerMiddleware.logIp);



//bootstrap models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file) {
  if (~file.indexOf('.js')) {
    require(modelsPath + '/' + file)
  }
})




//bootstrap route
let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function (file){
if(~file.indexOf('.js')){
  console.log("including the following file");
  console.log(routesPath + '/' + file);
  let route = require(routesPath + '/' + file);
  route.setRouter(app);
}

});

//404 route incase of improper route

app.use(globalErrorMiddleware._notFoundHandler);



app.listen(appConfig.port, () =>{
    console.log(`Example app listening on port ${appConfig.port}!`);
  
    //creating the mongodb connection here
    let db = mongoose.connect(appConfig.db.uri, {useNewUrlParser:true});
  });





  //handling mongoose connection error

mongoose.connection.on('error',function(err){
    console.log('database connection error');
    console.log(err)
  }); //end mongoose connection error
  
  //handling mongoose success event
  mongoose.connection.on('open',function(err){
    if(err){
      console.log("database error");
      console.log(err);
    }
    else{
      console.log("database connection open success");
    }
  });// end mongoose connection open handler