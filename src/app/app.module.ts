import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'


import { AuthService } from './service/auth.service';
import { AuthGuardService } from './service/auth-guard.service';
import { AppareilService } from './service/appareil.service';
import { UserService } from './service/user.service';


import { AppComponent } from './app.component';
import { MonPremierComponent } from './mon-premier/mon-premier.component';
import { AppareilComponent } from './appareil/appareil.component';
import { AuthComponent } from './auth/auth.component';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { EditAppareilComponent } from './edit-appareil/edit-appareil.component';
import { UserListComponent } from './user-list/user-list.component';
import { NewUserComponent } from './new-user/new-user.component';


const appRoutes: Routes = [
  {path: 'auth', component: AuthComponent },
  {path: 'appareils', canActivate: [AuthGuardService], component: AppareilViewComponent },
  {path: 'appareils/:id', canActivate: [AuthGuardService], component: SingleAppareilComponent },
  {path: 'edit', canActivate: [AuthGuardService], component: EditAppareilComponent },
  {path: 'user', component: UserListComponent },
  {path: 'new-user', component: NewUserComponent },
  {path: '', component: AppareilViewComponent },
  {path: 'not-found', component: FourOhFourComponent },
  {path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    MonPremierComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent,
    SingleAppareilComponent,
    FourOhFourComponent,
    EditAppareilComponent,
    UserListComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppareilService,AuthService,AuthGuardService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
