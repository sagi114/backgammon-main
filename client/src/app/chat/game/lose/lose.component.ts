import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/services/guards/auth-guard';
import { IGameService } from '../igame.service';

@Component({
  selector: 'app-lose',
  templateUrl: './lose.component.html',
  styleUrls: ['./lose.component.css']
})
export class LoseComponent implements OnInit {

  constructor(private router:Router,private authService:AuthGuard) { }
  NavigateBackHome(){
    this.authService.givePermission();
    this.router.navigateByUrl('/lobby');
  }

  ngOnInit(): void { }

}
