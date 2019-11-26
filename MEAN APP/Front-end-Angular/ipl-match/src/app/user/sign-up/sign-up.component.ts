import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public fullname:string;
  public email:string;
  public password:string;

  constructor(public router: Router, public toastr: ToastrService) { }

  ngOnInit() {
  }

  goToSignin(){
    this.router.navigate(['/List']);
  }

  checkemail(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(this.email);
  }

  signupFunction(){
/*placeholder for signup function*/
if(!this.fullname){
  this.toastr.warning('Please full name to continue!', 'Enter full name to continue!');  
}
else if(!this.email){
  this.toastr.warning('Please Enter valid EMAIL!!!', 'Email ID is missing!');
  
}
else if(!this.checkemail()){
  this.toastr.warning('Enter proper valid Email!', 'Invalid email address!');
}
else if(!this.password){
  this.toastr.warning('Please enter password!', 'enter password to continue!');
}
else{
  //authentication block
  this.toastr.success('Your registration was successful!!!', 'Thank you for signing up!!');
  /* Sign up will be implemented once Express API and user table is ready */



  this.goToSignin();
}
    

  }
}
