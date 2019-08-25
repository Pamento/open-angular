import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): boolean | Observable<boolean> | Promise<boolean> {
    // throw new Error("Method not implemented.");
    if(this.authService.isAuth){
      return true;
    } else {
      this.router.navigate(['/auth']);
    }
  }

}
