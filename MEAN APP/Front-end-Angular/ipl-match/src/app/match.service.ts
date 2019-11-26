import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  //declarions
  private http: HttpClient;


  //URLS:-
  public matchURL = "http://localhost:3000/api/v1/ipldata/getmatches";
  public matchdetailsURL = "http://localhost:3000/api/v1/ipldata/getmatchesbyID";
  public matchscoreURL = "http://localhost:3000/api/v1/ipldata/matchscoreDetails"

  constructor(private _http: HttpClient) { 
    this.http = _http;
  }


  public getmatches= (page_number:number = 1, _season?:number,_city?:string,_venue?:string,_winner?:String,_team1?:string,_team2?:string): Observable<any> => { 
    let body ={
      page: page_number,
      season:_season,
      city:_city,
      venue:_venue,
      winner:_winner,
      team1:_team1,
      team2:_team2
    }

    return this.http.post(this.matchURL,body);
       
  }

  public getmatchesdetails= (match_id:number): Observable<any> => { 
    let body ={
      id: match_id
    }

    return this.http.post(this.matchdetailsURL,body);
       
  }
  public getmatchScore = (match_id:number, teamname:string): Observable<any> =>{
    let body = {
      id: match_id,
      team:teamname
    }
   body.id = match_id;
    return this.http.post(this.matchscoreURL,body);
  }


}
