import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-chat2',
  templateUrl: './chatv2.component.html',
  styleUrls: ['./chatv2.component.css']
})
export class Chatv2Component implements OnInit {
  data = 'no data';
  someNumber = 0;
  title = 'Websocket Angular client ';
  @Input() userName!: string;
  message!: string;
  output: any[] = [];
  feedback!: string;
  connectedUsers:any[]=[];
  @Input() to:any;
  @Output() UserToPlayWith = new EventEmitter<any[]>();

  constructor( private service:WebSocketService) {
    this.UserToPlayWith.emit(this.to);
  }
  ngOnInit(): void {
    this.service.listen('typing').subscribe((data)=>{this.updateFeedback(data)});
    this.service.listen('chat').subscribe((data)=>{this.updateMessage(data)});
  }
  updateMessage(data: any) {
    this.feedback = '';
    if(!!!data) return;
    this.output.push(data);
  }
  sendMessage() {
    this.service.emit('chat', {
      message: this.message,
      handle: this.userName
    });
    this.message = "";
  }

  privateMessage(){
    if(!this.to) return;
      this.service.emit('private message', {
        to:this.to,
        message: this.message,
        handle: this.userName
      });
    this.output.push({
      message: this.message,
      handle: this.userName
    })
    this.message = "";
    this.feedback= "";
  }

  messageTyping(): void {
    this.service.emit('typing', this.userName);    
  }

  updateFeedback(data: any){
    this.feedback = `${data} is typing a message`;
  }
 
}