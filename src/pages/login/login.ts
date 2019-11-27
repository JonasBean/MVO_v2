import { Component } from '@angular/core';
<<<<<<< HEAD
import { NavController} from 'ionic-angular';
=======
import { NavController } from 'ionic-angular';
>>>>>>> 4ea74559c5213af5ba89f995138ba8fa6e12198e

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { MenuPage } from '../menu/menu';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Email ist notwendig.' },
     { type: 'pattern', message: 'Korrekte Email-Adresse eingeben.' }
   ],
   'password': [
     { type: 'required', message: 'Passwort ist notwendig.' },
     { type: 'minlength', message: 'Passwort muss mindestens 5 Zeichen lang sein.' }
   ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ionViewWillLoad(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.navCtrl.push(MenuPage);
    }, err => {
      this.errorMessage = err.message;
    })
  }

  goRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

}
