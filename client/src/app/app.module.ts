import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatModule } from './chat/chat.module';
import { FormsModule } from '@angular/forms';
import { StartPageModule } from './start-page/start-page.module';
import { SighnInAndUpModule } from './sighn-in-and-up/sighn-in-and-up.module';
import { DatePipe } from '@angular/common';
import { ServerServiceService } from './services/server-service.service';
import { HttpClientModule } from '@angular/common/http';
// import { Chatv2Component } from './chatv2/chatv2.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent
    // Chatv2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChatModule,
    FormsModule,
    StartPageModule,
    SighnInAndUpModule,
    SocketIoModule.forRoot(config),
    HttpClientModule
  ],
  providers: [
    DatePipe,
    ServerServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
