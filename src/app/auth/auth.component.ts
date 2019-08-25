import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AppareilService } from '../service/appareil.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private apareilService: AppareilService ) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn(){
    this.authService.signIn().then(
      () => {
        console.log('Sign in successful !');
        this.authStatus = this.authService.isAuth;
        this.apareilService.getAppareilFromServer();
        this.router.navigate(['appareils']);
      }
    );
  }

  onSignOut(){
    this.authService.signOut();
    console.log('Sign in successful !');
    this.authStatus = this.authService.isAuth;
  }

}
