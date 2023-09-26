import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/services/guards/auth-guard';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.css']
})
export class WinComponent implements OnInit {

  constructor(private router: Router,private authService:AuthGuard) { }
  NavigateBackHome(){
    this.authService.givePermission();
    this.router.navigateByUrl('/lobby');
  }

  ngOnInit(): void {}
}
