import { Component, OnInit } from '@angular/core';


import { MatchService } from './../../match.service';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {

  public matchdetails:any;
  public id:number;
  public ErrorMessage:boolean = false;
  public team1score:number;
  public team2score:number;

  constructor(public _MatchService:MatchService, public toastr: ToastrService, public _route: ActivatedRoute, public router:Router) {
    
   }

  ngOnInit() {
    this._route.params.subscribe(params => {
      console.log("ID from List obtained from : "+ params['id']);
      let ID = params['id'];
      this.id = ID;
    });

    this.getmatchdetailsList();
    
  }

  getmatchdetailsList(){
    let match;
    match = this._MatchService.getmatchesdetails(this.id).subscribe((result) => {
      if(result.error == false){
        /*works for loading data*/
        console.log("List page results:-"+ result.data);        
        this.matchdetails = result.data;
        this.toastr.success('Details are loaded successfully!', 'MatchDetails are loaded!');
        this.getmatchscoredetails(this.matchdetails.team1,this.matchdetails.team2,this.id);
      }
      if(result.error == true){
        console.log("Please start the node server or some error with express backend");
        this.toastr.error('some error with express backend', 'Please start the node server');
      }

    },(error:HttpErrorResponse)=>{
      console.log("Error has occured, start node server and check console");
      console.log("Error is :-"+error);
      this.ErrorMessage = true;
      this.toastr.error('some error with express backend', 'Please start the node server');

    });

  }
  getmatchscoredetails(team1:string,team2:string,id:number)
  {
    let score1,score2;
    score1= this._MatchService.getmatchScore(id,team1).subscribe((result)=>{
      if(result.error == false){
        /*works for loading data*/
        let team2scoreResult = result.data;
        this.team1score = team2scoreResult[0].total;       
      }
      if(result.error == true){
        console.log("Please start the node server or some error with express backend");
        this.toastr.error('some error with express backend', 'Please start the node server');
      }

    },(err)=>{
      this.ErrorMessage = true;
      console.log("Please start the node server or some error with express backend");
      this.toastr.error('some error with express backend', 'Please start the node server');

    });
    score2= this._MatchService.getmatchScore(id,team2).subscribe((result)=>{

      if(result.error == false){
        /*works for loading data*/
        let team1scoreResult = result.data;
        this.team2score = team1scoreResult[0].total;       
      }
      if(result.error == true){
        console.log("Please start the node server or some error with express backend");
        this.toastr.error('some error with express backend', 'Please start the node server');
      }

    },(err)=>{

    });

  }

}
