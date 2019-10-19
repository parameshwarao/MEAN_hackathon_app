import { Component, OnInit } from '@angular/core';
import { MatchService } from './../../match.service';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {

  public matchlist:any;
  public ErrorMessage:boolean = false;
  public page:number = 1;
  
  //search items:-

  public options:number [] = [null,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008];

  public cityName:string;
  public venueName:string;
  public team1:string;
  public team2:string;
  public winner:string;
  public season:number;




  constructor( public _MatchService:MatchService, public toastr: ToastrService ) { }

  ngOnInit() {
    this.getmatchdetails();
  }
  getmatchdetails(){
    let match;
    match = this._MatchService.getmatches(this.page,this.season,this.cityName,this.venueName,this.winner,this.team1,this.team2).subscribe((result) => {
      if(result.error == false){
        /*works for loading data*/
        console.log("List page results:-"+ result.data[1]);
        console.log("List page results:-"+ result.data[1].team1);
        this.matchlist = result.data;
        this.toastr.success('List page results are loaded!', 'MatchDetails are loaded!');

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


  nextpage(){
    this.page++;
    this.getmatchdetails();

  }
  prevPage(){
    if(this.page<=1){
      this.toastr.error('you have reached first page');          
    }
    else{
      this.page = this.page - 1;
      this.getmatchdetails();  
    }
  }
  seasonSearch(data:any){
    this.toastr.info('Searching by Season '+this.season+'!', 'Matchlist search!!');
    this.getmatchdetails();
  }
  citysearch(){
    this.toastr.info('Searching by city '+this.cityName+'!', 'Matchlist search!!');
    this.getmatchdetails();
  }
  VenueSearch(){
    this.toastr.info('Searching by venue!', 'Matchlist search!!');
    this.getmatchdetails();
  }
  winnerSearch(){
    this.toastr.info('Searching by winner!', 'Matchlist search!!');
    this.getmatchdetails();
  }
  defenderSearch(){
    this.toastr.info('Searching by defender!', 'Matchlist search!!');
    this.getmatchdetails();
  }
  challengerSearch(){
    this.toastr.info('Searching by challenger!', 'Matchlist search!!');
    this.getmatchdetails();
  }
  ResetSearch(){
    this.cityName = '';
  this.venueName = '';
  this.team1 = '';
  this.team2 = '';
  this.winner = '';
  this.toastr.info('Search has been reset!', 'MatchDetails list are reset!');
  this.getmatchdetails();

  }






  

}
