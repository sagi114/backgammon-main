import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { WebSocketService } from 'src/app/chatv2/web-socket.service';

@Component({
  selector: 'app-private-messege',
  templateUrl: './private-messege.component.html',
  styleUrls: ['./private-messege.component.css']
})
export class PrivateMessegeComponent implements OnInit {
  data = 'no data';
  someNumber = 0;
  title = 'Websocket Angular client ';
  userName!: string;
  message!: string;
  output: any[] = [];
  feedback!: string;
  connectedUsers:any[]=[];
  @Input() toToken:any;
  @Input() to:any;

  constructor(private socket: Socket, private service:WebSocketService) {
  }
  ngOnInit(): void {
    this.service.listen('connected').subscribe((data)=>{this.connectedUsers = data});
    this.service.listen('typing').subscribe((data)=>{this.updateFeedback(data)});
    this.service.listen('chat').subscribe((data)=>{this.updateMessage(data)});
  }
  updateMessage(data: any) {
    this.feedback = '';
    if(!!!data) return;
    this.output.push(data);
  }
  sendMessage() {
    console.log(`this.to===${this.to}`);
    console.log(`this.toToken===${this.toToken}`);
    
    if(this.to!==undefined){
      this.service.emit('chat', {
        message: this.message,
        handle: this.userName
      });
      this.message = "";
    }
    else{
      this.ChatToWhom('chat To Token MySelf')
      this.ChatToWhom('chat To Token')
      this.message = "";
    }
    
  }
  ChatToWhom(str:string){
    this.service.emit(str, {
      message: this.message,
      handle: this.userName,
      To:this.toToken
    });
  }

  privateMessage(){
    if(!this.userName) return;
    if(this.to){
      this.service.emit('private message', {
        to:this.to,
        message: this.message,
        handle: this.userName
      });
    }  
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
  checkIfNeedPrivate():boolean{
    return this.to!==undefined
  }
  
  // }
  // emitNumber(){
  //   this.socket.emit("emitNumber", this.someNumber)
  // }

  // emitRandom(){
  //   this.socket.emit("emitRandom")
  // }
}
