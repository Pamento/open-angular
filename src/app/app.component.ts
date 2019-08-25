import { Component, OnInit, OnDestroy } from '@angular/core';
import { Resolve } from '@angular/router';// if this one not work thatone below can be good
// import { resolve } from 'dns';
import { reject } from 'q';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  /**
   * s'il n'y a pas
   * @param counterSubscription: Subscription;
   * :
   * ce extrait d'un tuto descript ça :
   *
   * Pour l'instant, cette souscription n'est pas stockée dans une variable :
   * on ne peut donc plus y toucher une fois qu'elle est lancée,
   * et ça peut vous causer des bugs !
   * En effet, une souscription à un Observable
   * qui continue à l'infini continuera à recevoir les données,
   * que l'on s'en serve ou non, et vous pouvez en subir des comportements inattendus.
   * Ce n'est pas le cas pour tous les Observables.
   * Généralement, les souscriptions aux Observables fournis par Angular
   * se suppriment toutes seules lors de la destruction du component.
   * Afin d'éviter tout problème, quand vous utilisez des Observables personnalisés,
   * il est vivement conseillé de stocker la souscription dans un objet Subscription
   * (à importer depuis rxjs/Subscription):
   */
  secondes: number;
  counterSubscription: Subscription;

  appareilOne:string = "Machine à laver";
  appareilTwo:string = "Frigo";
  appareilTree:string = "Ordinateur";

  constructor(){  }

  ngOnInit(): void {
    const counter = interval(1000);
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.secondes = value;
      },
      (error) => {
        console.log('Uh-oh, an error occurred! : '+error);
      },
      () => {
        console.log('Observable complete!');
      }
    );
  }
  /**
   *  unsubscribe() nessecery in case of infinish Observable
   */
  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }
}
