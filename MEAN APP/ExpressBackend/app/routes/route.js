const express = require('express');
const iPLController = require ('./../controllers/iPLController');
const appConfig = require("../../config/appConfig");
let setRouter = (app) =>{
    let baseUrl = appConfig.apiVersion + '/ipldata';

    app.get('/', iPLController.helloworld);

    /*ignore test functions*/

    /*application controller routes*/
    
    app.post(baseUrl + "/getmatches", iPLController.getAllmatches);
    app.post(baseUrl + "/getmatchesbyID", iPLController.getmatchesByID);
    app.post(baseUrl + "/matchscoredetails", iPLController.matchscoreDetails);



    /* team stats routes*/
    app.post(baseUrl + "/winsperseason", iPLController.WinsPerSeasons);
    app.post(baseUrl + "/playedperseason", iPLController.matchesplayedperseason);
    app.post(baseUrl + "/lostperseason", iPLController.matcheslostperseason);
    app.post(baseUrl + "/totalrunscored", iPLController.TotalRunsScored);
    app.post(baseUrl + "/totalballscored", iPLController.Totalballsbowled);
    app.post(baseUrl + "/totalwicketstaken", iPLController.TotalWicketsTaken);





    /*user account routes*/
    app.post(baseUrl + "/login", iPLController.userlogin);
    app.post(baseUrl + "/logout", iPLController.userlogout);
    app.post(baseUrl + "/signup", iPLController.usersignup);
    

    

    

    /*application controller routes end*/
    app.get("/hello-world", iPLController.helloworld);
    app.get("/example", iPLController.printexample);
    app.get("/test/route/:search/:secondvalue", iPLController._testParams);
    app.get("/test/query", iPLController._testquery);
    app.post("/test/bodytest", iPLController._testbody);




}//end setRouter Function

module.exports = {
    setRouter: setRouter
};