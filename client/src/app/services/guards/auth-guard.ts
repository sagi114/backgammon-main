import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {

    canActive:boolean = false;
    constructor(private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
     boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.canActive) return this.canActive

        this.router.navigateByUrl('/StartPage');
        return this.canActive;
    }

    givePermission(){
        this.canActive = true;
    }

    acessDenied(){
        this.canActive = false;
    }
}
