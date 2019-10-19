import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable(
)
export class ListrouteguardService {
  public cookies:any;

  constructor(private router: Router,public CookieService:CookieService) { }  

  canActivate(route: ActivatedRouteSnapshot): boolean {
    /*this.cookies= this.CookieService.get('test');*/

    console.log("in guard service");

    /*if (Cookie.get('authtoken') === undefined || Cookie.get('authtoken') === '' || Cookie.get('authtoken') === null) {

      this.router.navigate(['/']);

      return false;

    } else {

      return true;

    }*/

    return true;

  }
}
