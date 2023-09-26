import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from '../start-page/start-page.component';



const routes: Routes = [
  { path: 'StartPage', component: StartPageComponent},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingStartPageModule { }
