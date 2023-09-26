import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from 'src/app/chatv2/web-socket.service';

@Component({
  selector: 'app-chat-game',
  templateUrl: './chat-game.component.html',
  styleUrls: ['./chat-game.component.css']
})
export class ChatGameComponent implements OnInit {

  selectedUser:any
  accept:boolean=false
  rivalToken :any;
  connectedUsersList: any[]=[];

  constructor(private activatedRoute: ActivatedRoute,private router: Router,private service:WebSocketService,private route: ActivatedRoute) {
    this.rivalToken = this.route.snapshot.paramMap.get('rivalToken')
    console.log(`rivalToken=${this.rivalToken}`);
    
   }

  ngOnInit(): void {
    this.service.listen('gameacssept').subscribe((data)=>{this.accept=true})
    this.service.listen('DenyReturn').subscribe((data)=>{this.NavigateToChatLogged()})
    // this.service.listen('gameinvite2').subscribe((data)=>{this.service.emit("Deny",data.To.token)})
    
    this.route.queryParams.subscribe((params)=>{
// <<<<<<< HEAD
      console.log(params);
      'rivalToken'
      this.accept = JSON.parse(params.accept)
      this.rivalToken= params.rivalToken
      console.log(`accept=`,this.accept);
      console.log(`rivalToken=`,this.rivalToken);
      this.accept = JSON.parse(params.accept)
    })
  }
  GetPlayer($event:any){
    this.selectedUser=$event
  }
  getAccept():boolean{
    console.log(`accept that returns is ${this.accept}`);
    return this.accept
  }
  NavigateToChatLogged(){
    this.router.navigateByUrl('lobby');
  }

}
