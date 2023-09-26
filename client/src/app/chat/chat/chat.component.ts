import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private socket: Socket,private datePipe: DatePipe) { }
  // ,private datePipe: DatePipe
  AllMessege:string[]=[];
  data='no data';
  someMeesege=0;
  ngOnInit(): void {
    this.socket.on('returnMessege',(data:string)=>{
      console.log(data);
      this.data=data
      this.AllMessege.push(data)
    })
    this.socket.on('randomNumber',(data:string)=>{
      console.log(data);
      this.data=data
    })
  }
  SendMessege(){
    console.log(this.someMeesege);
    
    this.socket.emit("SendMessege",this.someMeesege)
    this.getTime()
  }
  emitRandom(){
    this.socket.emit("emitRandom")
  }
  getTime(){
     var myDate = new Date();
    this.datePipe.transform(myDate, 'yyyy-MM-dd-hh-mm-ss');
    this.socket.emit("SendMessege",myDate)
  }
  checkIfMessege(num:number):boolean{
    return num%2===0
  }
}
