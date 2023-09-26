import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/chatv2/web-socket.service';
import { UserModel } from 'src/app/Model/UserModel';
import { AuthGuard } from 'src/app/services/guards/auth-guard';
import { ServerServiceService } from 'src/app/services/server-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  userForm: FormGroup;
  data:any;
  constructor(private fb:FormBuilder,private service:ServerServiceService, private router: Router
    ,private socketService:WebSocketService,private authGuard:AuthGuard) { 
    this.userForm = this.fb.group({
      email:["", [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Password:["", [Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
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

  AllowBtn(){ return this.checkIfPasswordValid()&&!this.checkIfNotValidEmail()}

  LogIn(){
    var User:UserModel={
      Email:this.userForm.value.email,
      Password:this.userForm.value.Password
    }
    this.service.LogIn(User).subscribe((data)=>{
      this.authGuard.givePermission();
      this.data = data;
      this.socketService.emit('new connection',data)  
      this.NavigateToNextPage();
    },(err)=>{
      alert(err.error.message);
    })
  }
  getUrl(){ return "url('src\assets\background_log_in.jpg')";}

NavigateToNextPage(){
  this.router.navigate(['/lobby'],{queryParams:{ID: this.data.id}});
}
MoveToHomePage(){
  this.router.navigateByUrl('StartPage');
}

}
