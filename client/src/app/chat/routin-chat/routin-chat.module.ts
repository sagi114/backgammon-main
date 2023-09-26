import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatGameComponent } from '../chat-game/chat-game.component';
import { ChatLoggedComponent } from '../chat-logged/chat-logged.component';
import { WinComponent } from '../game/win/win.component';
import { LoseComponent } from '../game/lose/lose.component';
import { AuthGuard } from 'src/app/services/guards/auth-guard';


const routes: Routes = [

  { path: 'lobby', component: ChatLoggedComponent, canActivate:[AuthGuard]},
  { path: 'game', component: ChatGameComponent , canActivate:[AuthGuard]},
  { path: 'lose', component: LoseComponent , canActivate:[AuthGuard]},
  { path: 'win', component: WinComponent , canActivate:[AuthGuard]},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutinChatModule { }
