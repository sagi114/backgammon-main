import { Component, OnInit } from '@angular/core';
import { Dice } from 'src/app/Model/Dice';
import { PlayMove } from 'src/app/Model/PlayMove';
import {  Chips } from '../../Model/Chips';
import { House} from '../../Model/House';
import { IGameService } from '../game/igame.service';
// import rollADie from 'roll-a-die';

const AmountOfHouse=28;//24 houses+ 0,25 win house+2 out houses one for black one for white
const WhitKillHouse=26
const BlackKillHouse=27
@Component({
  selector: 'app-game2-fix-problems',
  templateUrl: './game2-fix-problems.component.html',
  styleUrls: ['./game2-fix-problems.component.css']
})
export class Game2FixProblemsComponent implements OnInit {
  TurnsColor:string=""
  yourColor:string="White";
  public isTrue:boolean=false
  AllHouses:House[]=[];
  public halfeTopHouse:House[]=[]
  public halfeBottomHouse:House[]=[]
  dice:Dice[]=[];
  FunctionOfMovingDiceByOthers:any
  public startHouse:House={
    Id:0,
    ChipsInHouse:[],
    CouldLandOn:false
  }
  
  constructor(private service:IGameService) {
    this.CreateHouses()
   }
   ngOnInit(): void {
    this.service.listen('gameplay').subscribe((data)=>{this.GetInformationOnMoveFromOtherPlayer(data)});
    this.service.listen('changeturn').subscribe((data)=>{this.getTurn(data)});
    this.service.listen('dicethrow').subscribe((data)=>{this.otherPlayerTuchedDice(data)});
  }

  //create
  CreateHouses(){
    for (let index = 0; index < AmountOfHouse; index++) {
      this.AllHouses[index]={
        Id:index,
        ChipsInHouse:[],
        CouldLandOn:false
      }
    }
    this.GetBottomAllHouse()
    this.GetTopAllHouse()
    this.CreateChips()
  }
  CreateChips(){
    for (let index = 0; index < 2; index++) {
      this.AllHouses[1].ChipsInHouse.push(
        this.CreateSingleChip(index,"White")
        
      )
    }
    for (let index = 0; index < 5; index++) {
      this.AllHouses[6].ChipsInHouse.push(
        this.CreateSingleChip(index,"Black")
      )
    }
    for (let index = 0; index < 3; index++) {
      this.AllHouses[8].ChipsInHouse.push(
        this.CreateSingleChip(index,"Black")
      )
    }
    for (let index = 0; index < 5; index++) {
      this.AllHouses[12].ChipsInHouse.push(
        this.CreateSingleChip(index,"White")
      )
    }
    for (let index = 0; index < 5; index++) {
      this.AllHouses[13].ChipsInHouse.push(
        this.CreateSingleChip(index,"Black")
      )
    }
    for (let index = 0; index < 3; index++) {
      this.AllHouses[17].ChipsInHouse.push(
        this.CreateSingleChip(index,"White")
      )
    }
    for (let index = 0; index < 5; index++) {
      this.AllHouses[19].ChipsInHouse.push(
        this.CreateSingleChip(index,"White")
      )
    }
    for (let index = 0; index < 2; index++) {
      this.AllHouses[24].ChipsInHouse.push(
        this.CreateSingleChip(index,"Black")
      )
    }
    
  }
  GetTopAllHouse(){
    for (let index = 0; index < (this.AllHouses.length)/2-1; index++) {
      this.halfeTopHouse.push(this.AllHouses[index])
    }
  }
  GetBottomAllHouse(){
    // for (let index = (this.AllHouses.length)/2-1; index < this.AllHouses.length-2; index++) {
      for (let index = this.AllHouses.length-3; index > (this.AllHouses.length)/2-2; index--) {
      this.halfeBottomHouse.push(this.AllHouses[index])
    }
  }
  CreateSingleChip(index:number,color:string):Chips{
    let chip:Chips={
      Id:index,
      Color:color
    }
    return chip
  }
  ///////////////
  
  //ui logic
  checkIfElementIsOdd(num:number):boolean{
    return num%2!==0
  }
  getLastChip(StartHouse:House):Chips{
    const lastChipInArrey=StartHouse.ChipsInHouse.length-1
    return StartHouse.ChipsInHouse[lastChipInArrey]
  }
  ///////////////

  CheckIfCouldLand(house:House){
        this.startHouse=house
        console.log("MoveSolder");
        if(house.ChipsInHouse.length===0)return
        console.log("more then 0 solders");
        const chip=house.ChipsInHouse[house.ChipsInHouse.length-1]
        console.log("last chip");
        
        if(this.CheckIfNoDeadUser(chip)){
          console.log("no dead player");
          this.checkIfHouseIsLandable(chip,house,0)
          this.checkIfHouseIsLandable(chip,house,1)
        }
        else{
          
          if(house.Id===WhitKillHouse||house.Id===BlackKillHouse){
            this.MoveFromDeadHouse(house)
          }
        }
  }
  // CheckIfCouldLandWhenDead(house:House){
  //   const chip=house.ChipsInHouse[house.ChipsInHouse.length-1]
  // }
  checkIfPlayersColorIsDead(chip:Chips):boolean{
    if(chip.Color==="White"){
      return this.AllHouses[WhitKillHouse].ChipsInHouse.length===0
    }
    else{
      return this.AllHouses[BlackKillHouse].ChipsInHouse.length===0
    }
  }
  //logic moves
  MoveSolder(house:House){
    console.log("starts moving solder");
    
      if(!house.CouldLandOn){
        this.turnAllHomesToBeCantLand();
        if(house.ChipsInHouse[0].Color===this.TurnsColor){
          
          // if(!this.checkIfPlayersColorIsDead(house.ChipsInHouse[0])){
          this.CheckIfCouldLand(house)
        }
        // }
      }
      else{
        if(this.startHouse.ChipsInHouse[0].Color===this.TurnsColor){
          console.log("moves user");
          this.MoveUser(this.startHouse,house,this.getLastChip(this.startHouse))
          let diceToNotUse=Math.abs(this.startHouse.Id-house.Id)
          console.log(diceToNotUse);
          if(this.startHouse.Id===WhitKillHouse||this.startHouse.Id===BlackKillHouse)diceToNotUse=this.getDiceMoves(house)
          for (let index = 0; index < this.dice.length; index++) {
            if(this.dice[index].DiceDots==diceToNotUse){
            this.dice[index].HaveBeanUsed=true
            this.dice.splice(index,1)
            console.log(`the dices are ${this.dice}`);
            
            console.log(`this.dice.length is ${this.dice.length}`);
            break
          }
          if(index===this.dice.length-1){
            for (let index = 0; index < this.dice.length; index++) {
              if(this.dice[index].DiceDots>diceToNotUse){
                this.dice.splice(index,1)
              }
            }
          }
        }
      }
      this.turnAllHomesToBeCantLand();
      // this.CheckIfYouWin(chip.Color)
    }
  }
  getDiceMoves(endHouse:House):number{
    if(endHouse.ChipsInHouse[0].Color==="White")return endHouse.Id 
    else return 25-endHouse.Id
  }
  MoveFromDeadHouse(DeadHouse:House){
    const chip=DeadHouse.ChipsInHouse[0]
    if(chip.Color==="White"){
      this.checkIfHouseIsLandable(chip,this.AllHouses[0],0)
      this.checkIfHouseIsLandable(chip,this.AllHouses[0],1)
    }
    else{
      this.checkIfHouseIsLandable(chip,this.AllHouses[25],0)
      this.checkIfHouseIsLandable(chip,this.AllHouses[25],1)
    }
  // }
  }
  turnAllHomesToBeCantLand(){
    this.AllHouses.forEach(h=>{
      h.CouldLandOn=false
    })
  }
  landWhenUserIsInHouse(numOfHouse:number,chip:Chips,begningHouse:House):number{
    console.log(`begin id is ${begningHouse.Id}`);
    
    if(begningHouse.Id===0)return NaN
    let count:number=0
    if(chip.Color==="White"){
      console.log(`color is white`);
      for (let index = 25; index > 18; index--) {
        console.log(`index is ${index}`);
        count=count+this.AllHouses[index].ChipsInHouse.length
        if(count===15){
          console.log(`all chips are in house`);
          
          if(numOfHouse===25)
          {
            console.log(`take out chip`);
            return 25
          }
          else{
            console.log(`check if there is chips in bigger houses`);
            
            for (let index = 18; index < begningHouse.Id; index++) {
              if(this.AllHouses[index].ChipsInHouse.length!==0){
                console.log(`if there is return that there is`);
                return NaN
              }
            }
            console.log(`take out chips`);
            return 25
          }
        }
      }
    }
    else{
      console.log(`color is black`);
      for (let index = 0; index < 7; index++) {
        console.log(`index is ${index}`);
        count=count+this.AllHouses[index].ChipsInHouse.length
        console.log(`count is ${count}`);
        if(count===15){
          console.log("amount is 15");
          if(numOfHouse===0)return 0
          else{
            for (let index = 6; index > begningHouse.Id; index--) {
              console.log(`index of red house is ${index}`);
              if(this.AllHouses[index].ChipsInHouse.length!==0)return NaN
            }
            return 0
          }
        }
      }
    }
    return NaN
  }
  checkIfHouseIsLandable(chip:Chips,house:House,Dice:number){
    console.log("house is landable");
    
    if(this.dice[Dice]===undefined)return
    if(this.dice[Dice].HaveBeanUsed)return
    let houseToLand=this.CalculateAmountOfMoves(chip,house,this.dice[Dice])
    console.log(houseToLand);
    
    
    if(houseToLand<1||houseToLand>24)houseToLand=this.landWhenUserIsInHouse(houseToLand,chip,house)
    console.log(`263 houseToLand==${houseToLand}`);
    
    if(houseToLand!==NaN){
      let couldLand=this.CheckIfChipCouldLandOnHouse(chip,houseToLand)
      if(couldLand){
      this.AllHouses[houseToLand].CouldLandOn=true
    }
    } 
  }
  CalculateAmountOfMoves(chip:Chips,house:House,dice:Dice){
    console.log("calculateMoves");
    console.log(chip);
    
    if(chip.Color==="White"){
      console.log(dice.DiceDots);
    console.log("end moves: ");
    
      console.log(house.Id+dice.DiceDots);
      return house.Id+Number(dice.DiceDots)
    }
       console.log("in black");
       return house.Id-Number(dice.DiceDots)
  }
  ChipKillsOtherChip(KillerChip:Chips,MurderdChip:Chips,TheHouse:House){
    TheHouse.ChipsInHouse.pop()
    if(MurderdChip.Color==="White"){
      this.AllHouses[WhitKillHouse].ChipsInHouse.push(MurderdChip)
      this.MoveToOtherPersonInformation(TheHouse,this.AllHouses[WhitKillHouse])
    }
    else{
      this.AllHouses[BlackKillHouse].ChipsInHouse.push(MurderdChip)
      this.MoveToOtherPersonInformation(TheHouse,this.AllHouses[BlackKillHouse])
    } 
    TheHouse.ChipsInHouse.push(KillerChip)
    // this.MoveKilledToKilledHouse(MurderdChip)
  }
  MoveUser(StartHouse:House,EndHouse:House,chip:Chips){
    StartHouse.ChipsInHouse.pop()
    if(EndHouse.ChipsInHouse.length!==1){
      EndHouse.ChipsInHouse.push(chip)
    }
    else{
      if(this.checkIfKill(EndHouse,chip)){
        this.ChipKillsOtherChip(chip,EndHouse.ChipsInHouse[0],EndHouse)
      }
      else EndHouse.ChipsInHouse.push(chip)
    }
    this.MoveToOtherPersonInformation(StartHouse,EndHouse)
    this.CheckIfYouWin(chip.Color)
  }
  checkIfKill(EndHouse:House,chip:Chips){
    if(chip.Color===EndHouse.ChipsInHouse[0].Color)
    return false
    else return true
  }
  /////////////


  AllowButton():boolean{
    // return this.dice.length===0
    let chip:Chips={Color:"White"}
    if(this.dice.length===0)return true
    if(this.dice.length===1||this.dice.length>2){
       if(this.TurnsColor==="White"){
      if(this.AllHouses[WhitKillHouse].ChipsInHouse.length!==0){
        if(!this.CheckIfChipCouldLandOnHouse(chip,this.dice[0].DiceDots)){
          this.dice=[]
          return this.AllowButton()
        }
      }
    }
    else{
      chip.Color="Black"
      if(this.AllHouses[BlackKillHouse].ChipsInHouse.length!==0){
        if(!this.CheckIfChipCouldLandOnHouse(chip,25-this.dice[0].DiceDots)){
          this.dice=[]
          return this.AllowButton()
        }
      }
    }
    for (let index = 1; index < this.AllHouses.length-2; index++) {
      if(this.AllHouses[index].ChipsInHouse.length===0)continue
      if(this.AllHouses[index].ChipsInHouse[0].Color!==this.TurnsColor)continue
      const foundMoves=this.CheckIfCouldMove(this.AllHouses[index],this.dice[0].DiceDots)
      if(foundMoves)return false
      console.log(`foundMoves 1 dice- ${foundMoves}`);
    }
    this.dice=[]
    return this.AllowButton()
  }
  if(this.dice.length===2){
    if(this.TurnsColor==="White"){
      if(this.AllHouses[WhitKillHouse].ChipsInHouse.length!==0){
        if(!this.CheckIfChipCouldLandOnHouse(chip,this.dice[0].DiceDots)&&!this.CheckIfChipCouldLandOnHouse(chip,this.dice[1].DiceDots)){
          this.dice=[]
          return this.AllowButton()
        }
      }
    }
    else{
      chip.Color="Black"
      if(this.AllHouses[BlackKillHouse].ChipsInHouse.length!==0){
        if(!this.CheckIfChipCouldLandOnHouse(chip,25-this.dice[0].DiceDots)&&!this.CheckIfChipCouldLandOnHouse(chip,25-this.dice[1].DiceDots)){
          this.dice=[]
          return this.AllowButton()
        }
      }
    }
    for (let index = 1; index < this.AllHouses.length-2; index++) {
      if(this.AllHouses[index].ChipsInHouse.length===0)continue
      if(this.AllHouses[index].ChipsInHouse[0].Color!==this.TurnsColor)continue
      const foundMoves=this.CheckIfCouldMove(this.AllHouses[index],this.dice[0].DiceDots)||this.CheckIfCouldMove(this.AllHouses[index],this.dice[1].DiceDots)
      console.log(`foundMoves 2 dice- ${foundMoves}`);
      
      if(foundMoves)return false
    }
    this.dice=[]
    return this.AllowButton()
  }
    return false
  }
  CheckIfCouldMove(StartHouse:House,Dice:number):boolean{
    const c:Chips=this.getLastChip(StartHouse)
    console.log(`c.Color ${c.Color}`);
    
    if(c.Color==="White"){
      return this.CheckIfChipCouldLandOnHouseForCheckingMoves(c,Number(StartHouse.Id)+Number(Dice),StartHouse)
      // return true
    }
    else{
      return this.CheckIfChipCouldLandOnHouseForCheckingMoves(c,StartHouse.Id-Dice,StartHouse)
      // return true
    }
  }
  CheckIfChipCouldLandOnHouseForCheckingMoves(chip:Chips,numberOfHouse:number,begningHouse:House):boolean{

    if(numberOfHouse<25&&numberOfHouse>0){
      if(this.AllHouses[numberOfHouse].ChipsInHouse.length===0)return true
      if(this.AllHouses[numberOfHouse].ChipsInHouse.length===1)return true
      else
      return this.AllHouses[numberOfHouse].ChipsInHouse[0].Color===chip.Color
    }
    else{
      //כרגע
      return this.CheckIfUserIsInHouseAndCouldStillMove(numberOfHouse,chip,begningHouse)
      // return true
    }
    // return true
    
  }
  CheckIfUserIsInHouseAndCouldStillMove(numOfHouse:number,chip:Chips,begningHouse:House):boolean{
    console.log(`begin id is ${begningHouse.Id}`);
    
    // if(begningHouse.Id===0)return false
    let count:number=0
    if(chip.Color==="White"){
      console.log(`color is white`);
      for (let index = 25; index > 18; index--) {
        console.log(`index is ${index}`);
        count=count+this.AllHouses[index].ChipsInHouse.length
        if(count===15){
          console.log(`all chips are in house`);
          
          if(numOfHouse===25)
          {
            console.log(`take out chip`);
            return true
          }
          else{
            console.log(`check if there is chips in bigger houses`);
            
            for (let index = 18; index < begningHouse.Id; index++) {
              if(this.AllHouses[index].ChipsInHouse.length!==0){
                console.log(`if there is return that there is`);
                return false
              }
            }
            console.log(`take out chips`);
            return true
          }
        }
      }
    }
    else{
      console.log(`color is black`);
      for (let index = 0; index < 7; index++) {
        console.log(`index is ${index}`);
        count=count+this.AllHouses[index].ChipsInHouse.length
        console.log(`count is ${count}`);
        if(count===15){
          console.log("amount is 15");
          if(numOfHouse===0)return true
          else{
            for (let index = 6; index > begningHouse.Id; index--) {
              console.log(`index of red house is ${index}`);
              if(this.AllHouses[index].ChipsInHouse.length!==0)return false
            }
            return true
          }
        }
      }
    }
    return false
  }
  CheckIfChipCouldLandOnHouse(chip:Chips,numberOfHouse:number):boolean{
    if(this.AllHouses[numberOfHouse].ChipsInHouse.length===0)return true
    if(this.AllHouses[numberOfHouse].ChipsInHouse.length===1)return true
    else
      return this.AllHouses[numberOfHouse].ChipsInHouse[0].Color===chip.Color
  }
  //get infromation
  GetNumbersFromDice($event:number[]){
    if(this.dice.length!==2)this.ChangeTurns()
    
    for (let index = 0; index < $event.length; index++) {
      this.dice.push(
        {
          DiceDots:$event[index],
          HaveBeanUsed:false
      })
      if($event[0]===$event[1]&&this.dice.length===2)this.GetNumbersFromDice($event)
      console.log(this.dice);
      this.playerTuchedTheDice()
    }
  }
  CheckIfYouWin(Color:string):boolean{
    if(Color="Black"){
      return this.AllHouses[0].ChipsInHouse.length===15
    }
    else{
      return this.AllHouses[25].ChipsInHouse.length===15
    }
  }
  
  /////////////
  CheckIfNoDeadUser(chip:Chips){
    if(chip.Color==="White"){
      return this.AllHouses[WhitKillHouse].ChipsInHouse.length===0
    }
    else{
      return this.AllHouses[BlackKillHouse].ChipsInHouse.length===0
    }
  }
  checkIfAllChipsAreInHouse(){
    let numOfChipsInHouse:number=0
    if(this.yourColor==="White"){
      for (let index = 19; index < 26; index++) {
        // const element = array[index];
        numOfChipsInHouse=numOfChipsInHouse+this.AllHouses[index].ChipsInHouse.length
        if(numOfChipsInHouse===15)return true
      }
    }
    else{
      for (let index = 0; index < 7; index++) {
        numOfChipsInHouse=numOfChipsInHouse+this.AllHouses[index].ChipsInHouse.length
        if(numOfChipsInHouse===15)return true
      }
    }
    return false
  }
  ChangeTurns(){
    let randomNum=Math.floor(Math.random() * 10); 
    if(this.TurnsColor===""){
      if(randomNum<5)this.TurnsColor="White"
      else this.TurnsColor="Black"
      return
    }
    if(this.TurnsColor==="White")this.TurnsColor="Black"
    else this.TurnsColor="White"
    this.MoveTurnToTheNext()
  }


  //////for socket/////
  // SendAfterMove///
  MoveToOtherPersonInformation(StartHous:House,EndHouse:House){
    var move:PlayMove={
      StartHouse:StartHous,
      EndHouse:EndHouse
    }
    console.log(move);
    this.service.emit('game play',{
      PlayMove:move
    })
  }
  GetInformationOnMoveFromOtherPlayer(data:PlayMove){
    const startHous:House=data.StartHouse
    const endHouse:House=data.EndHouse
    this.AllHouses[startHous.Id].ChipsInHouse=startHous.ChipsInHouse
    this.AllHouses[endHouse.Id].ChipsInHouse=endHouse.ChipsInHouse
  }
  MoveTurnToTheNext(){
    this.service.emit('change turn',this.TurnsColor)
  }
  getTurn(data:string){
    this.TurnsColor=data
  }
  playerTuchedTheDice(){
    this.service.emit('dice throw',this.dice)
  }
  otherPlayerTuchedDice(data:Dice[]){
    this.dice=data
    let moves=[]
    for (let index = 0; index < this.dice.length; index++) {
      moves.push(this.dice[index].DiceDots)
    }
    this.FunctionOfMovingDiceByOthers(moves)
    //GetNumbersFromClient
  }
  
  PlayDiceByOtherUser($event:any){
    this.FunctionOfMovingDiceByOthers=$event
  }
}
