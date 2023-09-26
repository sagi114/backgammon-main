import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from '../log-in/log-in.component';
import { RegisterComponent } from '../register/register.component';

const routes: Routes = [
  { path: 'Register', component: RegisterComponent},
  { path: 'LogIn', component: LogInComponent},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingSighnInAndUpModule { }
