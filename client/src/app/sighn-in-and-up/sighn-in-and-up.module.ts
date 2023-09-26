import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { RoutingSighnInAndUpModule } from './routing-sighn-in-and-up/routing-sighn-in-and-up.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';



@NgModule({
  declarations: [
    LogInComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RoutingSighnInAndUpModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SighnInAndUpModule { }
