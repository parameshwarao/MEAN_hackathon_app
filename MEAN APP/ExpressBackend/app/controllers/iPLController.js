const express = require("express");
const mongoose = require('mongoose');
const response = require('./../libs/responseLib');
const time = require('./../libs/timeLib');
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib');

//model instances
const MatchesModel = mongoose.model('matchModel');
const DeliveryModel = mongoose.model('deliveryModel');

//testing and learning section
let helloWorldFunction = (req, res) => res.send('hello world');
let printExample = (req, res) => res.send('print example');
let testParams = (req, res) =>{
    console.log(req.params)
    res.send(req.params)
}
let testquery = (req, res) => {
console.log(req.query)
res.send(req.query)
}
let testbody =(req,res)=>{
    console.log(req.body)
    res.send(req.body)
    console.log("testbody invoked")
}//learning section end



//getting all data's

let getAllmatches = (req, res) => {



    let pagination=0;
    let skipped=0;
    
    //searchterms    
    let season = req.param.season;
    let city = req.param.city;   
    let team1 = req.param.team1;
    let team2 =  req.param.team2;
    let toss_winner = req.param.toss_winner;
    let toss_decision = req.param.toss_decision;
    let result =   req.param.result
    let dl_applied = req.param.dl_applied;
    let winner = req.param.winner;    
    let venue = req.param.venue;
    let $or = [];
    let team =req.body.team;



if(!check.isEmpty(req.body)){    
    pagination=1;
    pagination = (req.body.page && req.body.page>0) ? req.body.page*pagination : 1 ;
    if(pagination>1){
        skipped = 20*pagination;
    }
    /*console.log(req.body.page);
    console.log("skipped:-"+skipped);*/
    //query formation
    var query = {};
    if(!check.isEmpty(req.body.city)) {
        query.city  = new RegExp(req.body.city, "i");
    }
    if(!check.isEmpty(req.body.season)) {
        query.season  = req.body.season;
    }
    if(!check.isEmpty(req.body.venue)) {
        query.venue  = new RegExp(req.body.venue, "i");
    }
    if(!check.isEmpty(req.body.team)) {
        let list=[];
        let obj1={};
        let obj2={};
        obj1['team1']=new RegExp(req.body.team, "i");
        obj2['team2']=new RegExp(req.body.team, "i");
        list[0]=obj1;
        list[1]=obj2;
        query.$or = list;
    }    
    
    if(!check.isEmpty(req.body.team1)) {
        query.team1 = new RegExp(req.body.team1, "i");
    }
    if(!check.isEmpty(req.body.team2)) {
        query.team2 = new RegExp(req.body.team2, "i");
    }
    if(!check.isEmpty(req.body.winner)) {
        query.winner = new RegExp(req.body.winner, "i");
    }
    

    MatchesModel.find(query)
        .skip(skipped)
        .limit(20)    
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else if (check.isEmpty(result)) {
                logger.info('No Match details Found', 'IPLController: getAllmatches')
                let apiResponse = response.generate(true, 'No IPL matches found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Match Details Found', 200, result);
                res.send(apiResponse);
                //res.send(result)
            }
        })
}

else{

    //for regular fetch without any request body

    MatchesModel.find()
        .skip(skipped)
        .limit(10)    
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else if (check.isEmpty(result)) {
                logger.info('No Match details Found', 'IPLController: getAllmatches')
                let apiResponse = response.generate(true, 'No IPL matches found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Match Details Found', 200, result);
                res.send(apiResponse);
                //res.send(result)
            }
        })
    
}    


}// end get all Matches


//getmatchesBYID

let getmatchesByID = (req, res) => {

  
    if (check.isEmpty(req.body.id)) {       
        let apiResponse = response.generate(true, 'match Id is missing', 403, null)
        res.send(apiResponse)
    } else {

        MatchesModel.findOne({ 'id': req.body.id })
        .exec((err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('match details not found')
                let apiResponse = response.generate(true, 'match details not found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info("match details found sucessfully","IPLController:getmatchesByID",5)
                let apiResponse = response.generate(false, 'match details Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }




}//get matchesby ID

//GET match Details

let matchscoreDetails = (req, res) => {    

    if (check.isEmpty(req.body.id)) {       
        let apiResponse = response.generate(true, 'match Id is missing', 403, null)
        res.send(apiResponse)
    }
    else if(check.isEmpty(req.body.team)){
        let apiResponse = response.generate(true, 'team name is missing', 403, null)
        res.send(apiResponse)
    }
    else{

        /*id requestbody id should be int not a string*/
        let matchid = parseInt(req.body.id);
        
        DeliveryModel.aggregate( [
            { $match: { $and : [
                    { match_id: matchid },
                    {batting_team: req.body.team }
                ]} },
               {
                 $group: {
                    _id: null,
                    total: { $sum: "$total_runs" }
                 }
               }
            ] )
            .exec((err, result) => {
    
                if (err) {
    
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse)
    
                }
    
                else if (check.isEmpty(result)) {
    
                    console.log('match score not found')
                    let apiResponse = response.generate(true, 'match score not found', 404, null)
                    res.send(apiResponse)
    
    
                }
                else{
                    logger.info("matchscore found for team sucessfully","IPLController:matchdetails",5);       
                    let apiResponse = response.generate(false, 'match details Successfully.', 200, result)
                    res.send(apiResponse);
                }
    
    
            });//exec end



    }//else end

    




   


}//change of match score details

//team statistics part


//number of team wins per season

let WinsPerSeasons = (req, res) =>{
    //user login placeholder


    if (check.isEmpty(req.body.team)) {       
        let apiResponse = response.generate(true, 'match Id is missing', 403, null)
        res.send(apiResponse)
    }
    else{
        


        MatchesModel.aggregate( [
            { $match: { winner: req.body.team } },
            {
              $group: {
                 _id: {season :"$season"},
                 count: { $sum: 1 }
              }
            },
         { $sort: { '_id.season': -1 } }
         ] )
            .exec((err, result) => {
    
                if (err) {
    
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse)
    
                }
    
                else if (check.isEmpty(result)) {
    
                    console.log('wins per season not found')
                    let apiResponse = response.generate(true, 'wins per season not found', 404, null)
                    res.send(apiResponse)
    
    
                }
                else{
                    logger.info("wins per season found for team sucessfully","IPLController:WinsPerSeasons",5);       
                    let apiResponse = response.generate(false, 'match details Successfully.', 200, result)
                    res.send(apiResponse);
                }
    
    
            });//exec end


    
        
    }


    
}//wins per season end

//amount of matches played per season

let matchesplayedperseason = (req, res) =>{
    //matchesplayed per season
    if (check.isEmpty(req.body.team)) {       
        let apiResponse = response.generate(true, 'team name is missing', 403, null)
        res.send(apiResponse)
    }
    else{
        


        MatchesModel.aggregate( [
            { $match: { $or: [{
                 team1  :  req.body.team 
             },{	team2  :  req.body.team
             }] } },
            {
              $group: {
                 _id: {season :"$season"},
                 count: { $sum: 1 }
              }
            },
         { $sort: { '_id.season': -1 } }
         ] )
            .exec((err, result) => {
    
                if (err) {
    
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse)
    
                }
    
                else if (check.isEmpty(result)) {
    
                    console.log('matches played per season not found')
                    let apiResponse = response.generate(true, 'matches played per season not found', 404, null)
                    res.send(apiResponse)
    
    
                }
                else{
                    logger.info("matches played per season found for team sucessfully","IPLController:matchesplayedperseason",5);       
                    let apiResponse = response.generate(false, 'matches played found per season.', 200, result)
                    res.send(apiResponse);
                }
    
    
            });//exec end


    
        
    }

    
}//matches played per season end

//matches lost per season

let matcheslostperseason = (req, res) =>{
    //matches lost per season
    if (check.isEmpty(req.body.team)) {       
        let apiResponse = response.generate(true, 'team name is missing', 403, null)
        res.send(apiResponse)
    }
    else{
        


        MatchesModel.aggregate( [
            { $match: { $and : [
                        { 
                          $or : [ 
                                  {team1 :  req.body.team },
                                  {team2 :  req.body.team }
                                ]
                        },
                        { 
                          winner:{$ne : req.body.team}
                        }
                      ] } },
            {
              $group: {
                 _id: {season :"$season"},
                 count: { $sum: 1 }
              }
            },
         { $sort: { '_id.season': -1 } }
         ] )
            .exec((err, result) => {
    
                if (err) {
    
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse)
    
                }
    
                else if (check.isEmpty(result)) {
    
                    console.log('lost per season not found')
                    let apiResponse = response.generate(true, 'lost per season not found', 404, null)
                    res.send(apiResponse)
    
    
                }
                else{
                    logger.info("matches played found for team sucessfully","IPLController:matcheslostperseason",5);       
                    let apiResponse = response.generate(false, 'matches played found per season.', 200, result)
                    res.send(apiResponse);
                }
    
    
            });//exec end


    
        
    }
    
}//matches lost per season end

//total runs scored till now

let TotalRunsScored = (req, res) =>{
    //total runs scored
    if (check.isEmpty(req.body.team)) {       
        let apiResponse = response.generate(true, 'team name is missing', 403, null)
        res.send(apiResponse)
    }
    else{       


        DeliveryModel.aggregate([
            { $match: { batting_team: req.body.team } },
            {
              $group: {
                 _id: null,
                 total: { $sum: '$total_runs' }
              }
            }       
         ])
            .exec((err, result) => {
    
                if (err) {
    
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse)
    
                }
    
                else if (check.isEmpty(result)) {
    
                    console.log('total runs scored not found')
                    let apiResponse = response.generate(true, 'total runs scored not found', 404, null)
                    res.send(apiResponse)
    
    
                }
                else{
                    logger.info("total runs scored found for team sucessfully","IPLController:TotalRunsScored",5);       
                    let apiResponse = response.generate(false, 'total runs scored found', 200, result)
                    res.send(apiResponse);
                }
    
    
            });//exec end


    
        
    }
    
}//total runs scored end

//total balls bowled

let Totalballsbowled = (req, res) =>{
    //total runs scored
    if (check.isEmpty(req.body.team)) {       
        let apiResponse = response.generate(true, 'team name is missing', 403, null)
        res.send(apiResponse)
    }
    else{       


        DeliveryModel.aggregate([
            { $match: { bowling_team: req.body.team } },
            {
              $group: {
                 _id: null,
                 count: { $sum: 1 }
              }
            }       
         ])
            .exec((err, result) => {
    
                if (err) {
    
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse)
    
                }
    
                else if (check.isEmpty(result)) {
    
                    console.log('team name is not found')
                    let apiResponse = response.generate(true, 'total balls bowled not found', 404, null)
                    res.send(apiResponse)
    
    
                }
                else{
                    logger.info("total balls bowled found for team sucessfully","IPLController:TotalRunsScored",5);       
                    let apiResponse = response.generate(false, 'total balls bowled found.', 200, result)
                    res.send(apiResponse);
                }
    
    
            });//exec end


    
        
    }
    
}//total balls bowled end



//total wickets taken
let TotalWicketsTaken = (req, res) =>{
    //total runs scored
    if (check.isEmpty(req.body.team)) {       
        let apiResponse = response.generate(true, 'team name is missing', 403, null)
        res.send(apiResponse)
    }
    else{       


        DeliveryModel.aggregate( [
            { $match: { $and : [
                        { 
                           bowling_team: req.body.team
                        },
                        { 
                          player_dismissed:{$ne : ""}
                        }
                      ] } },
            {
              $group: {
                 _id: null,
                 count: { $sum: 1 }
              }
            }         
         ] )
            .exec((err, result) => {
    
                if (err) {
    
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse)
    
                }
    
                else if (check.isEmpty(result)) {
    
                    console.log('team name is not found')
                    let apiResponse = response.generate(true, 'total balls bowled not found', 404, null)
                    res.send(apiResponse)
    
    
                }
                else{
                    logger.info("total balls bowled found for team sucessfully","IPLController:TotalRunsScored",5);       
                    let apiResponse = response.generate(false, 'total balls bowled found.', 200, result)
                    res.send(apiResponse);
                }
    
    
            });//exec end


    
        
    }
    
}


//user login

let userlogin = (req, res) =>{
//user login placeholder

}

//user logout


let userlogout = (req, res) =>{
//user logout placeholder

}

//user signup

let usersignup = (req, res) =>{

//user signup placeholder
}



module.exports = {
    helloworld: helloWorldFunction,
    printexample: printExample,
    getAllmatches:getAllmatches,
    getmatchesByID:getmatchesByID,
    matchscoreDetails:matchscoreDetails,
    WinsPerSeasons:WinsPerSeasons,
    matchesplayedperseason:matchesplayedperseason,
    matcheslostperseason:matcheslostperseason,
    TotalRunsScored:TotalRunsScored,
    Totalballsbowled:Totalballsbowled,
    TotalWicketsTaken:TotalWicketsTaken,
    userlogin:userlogin,
    userlogout:userlogout,
    usersignup:usersignup,
    _testParams: testParams,
    _testquery: testquery,
    _testbody:testbody
  };