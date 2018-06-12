import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class AppareilService {
/**
 * the subscription function() work for transfer(emit) the data from service to diferent components
 * if I have good understud, this method make the data from service accesible in realtime everywhere in appliacation
*/
  appareilsSubject = new Subject<any[]>();

  private appareils = [];

  constructor( private httpClient: HttpClient ) { }

  emitAppareilSubject() {
    console.log(JSON.stringify(this.appareils));
    this.appareilsSubject.next(this.appareils.slice());
    console.log('emit service');
    console.log( 'slice array ', this.appareils.slice());
  }
  switchOnAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'éteint';
      this.emitAppareilSubject();
    }
  }

  switchOnOne(i: number) {
    this.appareils[i].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(i: number) {
    this.appareils[i].status = 'éteint';
    this.emitAppareilSubject();
  }
  getAppareilById(id: number){
    const appareil = this.appareils.find(
      (s) => {
        return s.id === id;
      }
    );
    return appareil;
  }
  addAppareil(name: string, status: string){
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };

    if(this.appareils.length === 0 ){
      appareilObject.id = 0;
    } else {
      appareilObject.id = this.appareils[this.appareils.length - 1].id + 1;
    }

    appareilObject.name = name;
    appareilObject.status = status;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
    console.log('appareil is added; AppareilService lign 70'+JSON.stringify(this.appareils));
  }
  /**
   * firebase by google start here
   *
   * la méthode  post() , qui permet de lancer un appel POST,
   * prend comme premier argument l'URL visée, et comme deuxième argument
   * le corps de l'appel,c'est-à-dire ce qu'il faut envoyer à l'URL;
   * l'extension  .json  de l'URL est une spécificité Firebase,
   * pour lui dire que vous lui envoyez des données au format JSON;
   * la méthode  post()  retourne un Observable — elle ne fait pas d'appel à elle toute seule.
   * C'est en y souscrivant que l'appel est lancé;
   * dans la méthode  subscribe() , vous prévoyez le cas où tout fonctionne
   * et le cas où le serveur vous renverrait une erreur.
   *
   * Cependant, si vous cliquez plusieurs fois sur ce bouton,Firebase continuera
   * à créer de nouveaux nodes, et dans ce cas de figure, ce n'est pas le comportement souhaité.
   * Il faudrait que chaque enregistrement écrase le précédent :
   * pour cela, utilisez plutôt la méthode  put()
   * (il n'y a pas besoin de changer les arguments, car
   * les méthodes  put()  et  post()  prennent les deux mêmes premiers arguments) :
   */
  seveAppareilToServer(){
    this.httpClient
    .put('https://my-firebase-demo-d2440.firebaseio.com/appareils.json', this.appareils )
    .subscribe(
      () => {
        console.log('Enregistrement terminé !'+typeof(this.appareils)+' --> '+JSON.stringify(this.appareils[0]));
      },
      (error) => {
        console.log('Error ! : '+error);
      }
    )
  }
  /**
   * Comme pour  post()  et  put() , la méthode get() retourne un Observable,
   * mais puisqu'ici, vous allez recevoir des données, TypeScript a besoin de savoir
   * de quel type elles seront (l'objet retourné est d'office considéré comme étant un Object).
   * Vous devez donc, dans ce cas précis, ajouter  <any[]>  pour dire que vous allez recevoir
   * un array de type  any , et que donc TypeScript peut traiter cet objet comme un array:
   * si vous ne le faites pas, TypeScript vous dira qu'un array ne peut pas être redéfini comme Object.
   */
  getAppareilFromServer(){
    this.httpClient
    .get<any[]>('https://my-firebase-demo-d2440.firebaseio.com/appareils.json')
    .subscribe(
      (response) => {
        this.appareils = response;
        this.emitAppareilSubject();
        console.log('J\'appel les appareils de firebase !'+typeof(this.appareils)+' --> '+JSON.stringify(this.appareils));
      },
      (error) => {
        console.log('Error ! : '+error);
      }
    )
  }

}
