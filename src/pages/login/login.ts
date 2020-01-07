import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
    private formBuilder: FormBuilder,
    private storage: Storage
  )
  {
    this.storage.get('value').then((val) => {
      this.authService.doLogin(val)
      .then(res => {
        this.navCtrl.push(MenuPage);
      }, err => {
        //this.errorMessage = err.message;
      });
    });
  }

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
      this.storage.set('value', value);
      this.navCtrl.push(MenuPage);
    }, err => {
      this.errorMessage = err.message;
    })
  }

  goRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

}
