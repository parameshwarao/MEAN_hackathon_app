//importing mongoose module
const mongoose = require('mongoose')
//import schema

const Schema = mongoose.Schema,ObjectId = Schema.ObjectId;


let matchModelSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            unique: true
        },
        id: {
            type: Number,
            default: ''
        },
        season: {
            type: Number,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        date: {
            type: String,
            default: ''
        },
        team1: {
            type: String,
            default: ''
        },
        team2: {
            type: String,
            default: ''
        },
        toss_winner: {
            type: String,
            default: ''
        },
        toss_decision: {
            type: String,
            default: ''
        },
        result: {
            type: String,
            default: ''
        },
        dl_applied: {
            type: Number,
            default: ''
        },
        winner: {
            type: String,
            default: ''
        },
        win_by_runs: {
            type: Number,
            default: ''
        },
        win_by_wickets: {
            type: Number,
            default: ''
        },
        player_of_match: {
            type: String,
            default: ''
        },
        venue: {
            type: String,
            default: ''
        },
        umpire1: {
            type: String,
            default: ''
        },
        umpire2: {
            type: String,
            default: ''
        },
        umpire3: {
            type: String,
            default: ''
        }

    }

    
);


let DeliveriDetailsModelSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            unique: true
        },
        match_id: {
            type: Number,
            default: ''
        },
        inning: {
            type: Number,
            default: ''
        },
        batting_team: {
            type: String,
            default: ''
        },
        bowling_team: {
            type: String,
            default: ''
        },
        over: {
            type: Number,
            default: ''
        },
        ball: {
            type: Number,
            default: ''
        },
        batsman: {
            type: String,
            default: ''
        },
        non_striker: {
            type: String,
            default: ''
        },
        bowler: {
            type: String,
            default: ''
        },
        is_super_over: {
            type: Number,
            default: ''
        },
        wide_runs: {
            type: Number,
            default: ''
        },
        bye_runs: {
            type: Number,
            default: ''
        },
        legbye_runs: {
            type: Number,
            default: ''
        },
        noball_runs: {
            type: Number,
            default: ''
        },
        penalty_runs: {
            type: Number,
            default: ''
        },
        batsman_runs: {
            type: Number,
            default: ''
        },
        extra_runs: {
            type: Number,
            default: ''
        },
        total_runs: {
            type: Number,
            default: ''
        },
        player_dismissed: {
            type: String,
            default: ''
        },
        dismissal_kind: {
            type: String,
            default: ''
        },
        fielder: {
            type: String,
            default: ''
        }     



    }
);





mongoose.model('matchModel',matchModelSchema,'ipLmatches');
mongoose.model('deliveryModel',DeliveriDetailsModelSchema,'ipLdeliveries');