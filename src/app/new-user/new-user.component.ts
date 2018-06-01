import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  constructor( private formBuilder: FormBuilder,
                private userService: UserService,
                private router: Router ) { }

  ngOnInit() {
    this.initForm();
  }
  /**
   * Comme pour la méthode template,
   * il existe un outil pour la validation de données
   * dans la méthode réactive : les  Validators .
   */
  initForm(){
    this.userForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      drinkPreference: ['',Validators.required],
      hobbies: this.formBuilder.array([])
    });
  }
  onSubmitForm(){
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference'],
      formValue['hobbies'] ? formValue['hobbies'] : []
    );

  this.userService.addUser(newUser);
  this.router.navigate(['/users']);
  }
  /**
   * Afin d'avoir accès aux  controls  à l'intérieur de l'array,
   * pour des raisons de typage strict liées à TypeScript,
   * il faut créer une méthode qui retourne  hobbies  par la méthode  get()
   * sous forme de  FormArray ( FormArray  s'importe depuis  @angular/forms )  :
   */
  getHobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }
  /**
   * Ce méthode qui permet d'ajouter un  FormControl  à  hobbies,
   * permettant ainsi à l'utilisateur d'en ajouter autant qu'il veut.
   * Vous allez également rendre le nouveau champ requis,
   * afin de ne pas avoir un array de  hobbies  avec des string vides :
   * ..
   * Cette méthode crée un  control  avec la méthode  FormBuilder.control(),
   * et l'ajoute au  FormArray  rendu disponible par la méthode  getHobbies().
   */
  onAddHobby(){
    const newHobbyControl = this.formBuilder.control(null, Validators.required);
    this.getHobbies().push(newHobbyControl);
  }

}
