import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { AppareilService } from '../service/appareil.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  appareils: any[] = [];
  appareilsSubscription: Subscription;
  @Input() appareilName:string;
  @Input() appareilStatus: string;
  @Input() index: number;
  @Input() id: number;

  constructor( private appareilService:AppareilService ) { }

/**
 * TEST - j'ajuté cela pour pouvoir afisher les appareils une fois les donnees recupere du serveur
 * avec cette ngOnInit() recopier de Appareil-view-component inclu aussi declaration
 * @param appareils: any[]; lign 12
 * @param appareilsSubscription: Subscription; ling 13
 * 1 TEST echoué
 * le code à netoyer
 */
ngOnInit():void{
  
    console.log('appareils.component : '+this.appareils);
    this.appareilsSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
  }

  getStatus(){
    return this.appareilStatus;
  }

  getColor(){
    if(this.appareilStatus === 'allumé'){
      return 'green';
    } else if(this.appareilStatus === 'éteint'){
      return 'red';
    }
  }
  onSwitch(){
    if(this.appareilStatus === 'allumé'){
      this.appareilService.switchOffOne(this.index);
    } else if(this.appareilStatus === 'éteint'){
      this.appareilService.switchOnOne(this.index);
    }
  }

}
