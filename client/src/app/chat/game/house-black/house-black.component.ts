import { Component, OnInit, Input } from '@angular/core';
import { House } from 'src/app/Model/House';

@Component({
  selector: 'app-house-black',
  templateUrl: './house-black.component.html',
  styleUrls: ['./house-black.component.css']
})
export class HouseBlackComponent implements OnInit {

  @Input() home!:House;
  @Input() isBlack!:boolean;
  constructor() { 
    
    
  }
  checkHomeTest(){
    console.log(this.home);
  }
  Checklength():boolean{
    return this.home.ChipsInHouse.length!==0
  }
  checkColor(){
    return this.home.ChipsInHouse[0].Color
  }
  ColorWhite():boolean{
    return this.checkColor()==="White"
  }
  checkIfCouldLand():boolean{
    return this.home.CouldLandOn
  }

  ngOnInit(): void {
  }
  getLenghtUnderFive():Boolean{
    return this.home.ChipsInHouse.length<5
  }

}
