import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  validations_form: FormGroup;
  item: any;
  loading: any;

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad() {
    this.getData()
  }

  getData() {
    this.item = this.navParams.get('data');
    this.validations_form = this.formBuilder.group({
      image: new FormControl(this.item.image, Validators.required),
      title: new FormControl(this.item.title),
      date: new FormControl(this.item.date, Validators.required),
      description: new FormControl(this.item.description, Validators.required),
      wear: new FormControl(this.item.wear, Validators.required),
      stamm: new FormControl(false),
      jugend: new FormControl(false)
    });


  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit(value) {
    let data = {
      image: value.image,
      title: value.title,
      date: value.date,
      description: value.description,
      wear: value.wear,
      stamm: value.stamm,
      jugend: value.jugend
    }
    if (!value.stamm && !value.jugend) {
      alert("Kein Orchester für den Termin gewählt!");
    } else {
      this.firebaseService.updateTask(this.item.id, data)
        .then(
          res => {
            this.viewCtrl.dismiss();
          }
        )
    }
  }

  delete() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to delete ' + this.item.title + '?',
      buttons: [
        {
          text: 'No',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            this.firebaseService.deleteTask(this.item.id)
              .then(
                res => this.viewCtrl.dismiss(),
                err => console.log(err)
              )
          }
        }
      ]
    });
    confirm.present();
  }
}
