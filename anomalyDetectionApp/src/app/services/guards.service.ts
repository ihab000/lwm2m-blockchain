import { Injectable } from '@angular/core';
import {
  Router, 
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(
    private router:Router,
    private auth:AuthService
  ) { }
            
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.isAuthenticated() && this.auth.getRole() > 0  && this.auth.getRole() < 3){
      return true;
    }else{
      console.error("You have not permission to view this page");
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class UnLoggedGuard implements CanActivate {

  constructor(
    private router:Router,
    private auth:AuthService
  ) { }
            
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.auth.isAuthenticated()){
      return true;
    }else{
      console.error("You are logged. You cannot see login page");
      this.router.navigate(['/clients']);
      return false;
    }
  }
}