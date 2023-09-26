import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../Model/UserModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegisterService } from './iregister.service';
import { Router } from '@angular/router';
import { ServerServiceService } from 'src/app/services/server-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  constructor(private fb:FormBuilder,private service:ServerServiceService,private router: Router) {
    this.userForm = this.fb.group({
      email:["", [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      name: ["Player"],
      Password:["", [Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
      ReeEnterPassword:["", [Validators.required,Validators.minLength(4),Validators.maxLength(10)]] 
    });
   }

  ngOnInit(): void {
    
  }
  get email() { return this.userForm.get('email') }
  checkIfNotValidEmail(){return !this.email?.valid}
  emailTouched(){return this.email?.touched}

  get Password() { return this.userForm.get('Password') }
  checkIfPasswordValid(){return this.Password?.valid}
  PasswordTouched(){return this.Password?.touched}
  
  get ReeEnterPassword() { return this.userForm.get('ReeEnterPassword') }
  ReeEnterPasswordTouched(){
    return this.ReeEnterPassword?.touched
    
  }
  checkIfPasswordConfromation(){
    return this.Password?.value===this.ReeEnterPassword?.value
  }
  AllowBtn(){
    return this.checkIfPasswordConfromation()&&this.checkIfPasswordValid()&&!this.checkIfNotValidEmail()
  }
  Register(){
    var newUser:UserModel={
      Email:this.userForm.value.email,
      Password:this.userForm.value.Password,
      Name: this.userForm.value.name
    }
    this.service.SignUp(newUser).subscribe((data)=>alert(data.message))
  }
  
  MoveToHomePage(){
    this.router.navigateByUrl('StartPage');
  }
}
