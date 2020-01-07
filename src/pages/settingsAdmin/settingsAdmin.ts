import { Component } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-settingsAdmin',
  templateUrl: 'settingsAdmin.html',
})
export class SettingsAdminPage {

  validations_form: FormGroup;
  settings: Array<any>;
  id: any;

  constructor(
    private viewCtrl: ViewController,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    private firebaseService: FirebaseService
  ) {
  }

  ionViewWillEnter() {
    this.getData();
  }

  ionViewWillLoad() {
    this.validations_form = this.formBuilder.group({
      name: new FormControl(Validators.required),
      part: new FormControl(Validators.required),
      stamm: new FormControl(false),
      jugend: new FormControl(false),
      admin: new FormControl(false),
    });
  }

  getData() {
    this.firebaseService.getUserSettings()
      .then(userData => {
        this.settings = userData;

        if (this.navParams.get('data')) {
          let data = {
            name: '',
            part: '',
            stamm: false,
            jugend: false,
            admin: false
          }
          this.firebaseService.createUserSettings(data);

          this.firebaseService.getUserSettings()
            .then(userData => {
              this.settings = userData;
            });
        }
      });
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit(id, value) {
    let data = {
      name: value.name,
      part: value.part,
      stamm: value.stamm,
      jugend: value.jugend,
      admin: value.admin
    }
    this.firebaseService.updateUserSettings(id, data)
      .then(
        res => {
          this.navCtrl.setRoot(MenuPage)
        }
      )
  }

}
