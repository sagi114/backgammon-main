import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IGameService {

  constructor(private socket: Socket) { }

  listen(eventname: string) : Observable<any>{
      return new Observable((subscribe)=>{
            this.socket.on(eventname, (data: any)=>{
                subscribe.next(data);
            })
      })
  }
  
  emit(eventname : string, data: any){
      this.socket.emit(eventname,data);
  }

  emitNoData(eventname : string){
    this.socket.emit(eventname);
}
}
