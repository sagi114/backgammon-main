import { Component, OnInit } from '@angular/core';
import {  EventEmitter, Input, Output } from '@angular/core';


declare function rollDice():any;
declare function returnNumbers():any;
declare function GetNumbersFromClient(numbers:number[]):any;
@Component({
  selector: 'app-rool-dice',
  templateUrl: './rool-dice.component.html',
  styleUrls: ['./rool-dice.component.css']
})
export class RoolDiceComponent implements OnInit {
  @Output() GetDicenumbers = new EventEmitter<number[]>();
  @Input() DisableButton!:boolean;
  cube:any
  public numbers:number[]=[]
  constructor() { 
  }
  clickbtn(){
    rollDice()
    this.numbers=returnNumbers()
    //socket on other user
    //emit GetNumbersFromClient(this.numbers)
    this.returnDiceNumbers();
  }
  returnDiceNumbers(){
    this.GetDicenumbers.emit(this.numbers);
  }
  ngOnInit(): void {
  }
  sendNumbersAndRollThem(num:number[]){
    console.log('parent methode in son works');
    
    GetNumbersFromClient(num)
  }
}
