import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartPageComponent } from './start-page/start-page.component';
import { RoutingStartPageModule } from './routing-start-page/routing-start-page.module';



@NgModule({
  declarations: [
    StartPageComponent
  ],
  imports: [
    CommonModule,
    RoutingStartPageModule
  ]
})
export class StartPageModule { }
