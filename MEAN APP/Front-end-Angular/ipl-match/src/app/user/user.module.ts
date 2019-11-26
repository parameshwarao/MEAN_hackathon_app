import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'sign-up', component: SignUpComponent }
    ])
  ]
})
export class UserModule { }
