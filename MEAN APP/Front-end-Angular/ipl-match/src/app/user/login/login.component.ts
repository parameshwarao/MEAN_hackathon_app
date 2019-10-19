import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginID:string;
  public password:string;

  constructor(public router: Router, public toastr: ToastrService) { }

  ngOnInit() {
  }


  goToSignin(){
    this.router.navigate(['/List']);
  }

  checkemail(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(this.loginID);
  }

   signinFunction(){

    if(!this.loginID){
      this.toastr.warning('Please Enter Login ID!', 'login ID missing!');
      
    }
    else if(!this.checkemail()){

      this.toastr.warning('Please Enter valid Email!', 'Invalid email address!');

    }
    else if(!this.password){
      this.toastr.warning('Please enter password!', 'enter password to continue!');
    }
    else{

      //authentication block

      /* Sign IN will be implemented once Express API and user table is ready */


      this.toastr.success('Welcome to Match List page!', 'Login is SuccessFul!');



      this.goToSignin();




    }



    
    
   }
   developerLogin(){
    this.toastr.success('Developer login to page!', 'Login is SuccessFul!');
    this.router.navigate(['/List']);
   }
   
   



}
