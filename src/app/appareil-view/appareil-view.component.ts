import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from '../service/appareil.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})

export class AppareilViewComponent implements OnInit {
  isAuth = false;
  appareils: any[];
  appareilsSubscription: Subscription;

  lastUpdate = new Promise((resolve, reject) => {
    const date =  new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  constructor( private appareilService: AppareilService ) {
    setTimeout(()=>{
      this.isAuth = true;
    }, 4000 );
  }
/**
 * the subscription methode work for transfer(emit) the data from service to diferent components
 * if I have good understud, this method make the data from service accesible in realtime everywher in appliacation
*/
  ngOnInit() {
    this.appareilsSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
  }
  onAllumer(){
    this.appareilService.switchOnAll();
  }
  onEteindre(){
    if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')){
    this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }
  /**
   * for destroy the continuos action of this service
   * @method ngOnDestroy() be caled on the clousure of application
   */
  ngOnDestroy(){
    this.appareilsSubscription.unsubscribe();
  }
  /**
   * on enregistre les données sur les appareils dans la base de données Firebase
   */
  onSave(){
    this.appareilService.seveAppareilToServer();
  }
  /**
   * on récuper les données de la bd Firebase
   */
  onFetch(){
    this.appareilService.getAppareilFromServer();
  }
}
