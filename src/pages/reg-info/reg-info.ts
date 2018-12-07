import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { MenuPage } from '../menu/menu';

import { FirebaseService } from '../services/firebase.service';



@IonicPage()
@Component({
  selector: 'page-reg-info',
  templateUrl: 'reg-info.html',
})
export class RegInfoPage {
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name ist notwendig.' },
    ],
    'part': [
      { type: 'required', message: 'Bitte Stimme angeben' },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private fireService: FirebaseService,
    private navCtrl: NavController
  ) { }

  ionViewWillLoad() {
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      part: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  saveUserInfo(value) {
    this.fireService.createUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.navCtrl.setRoot(MenuPage)
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }


}
