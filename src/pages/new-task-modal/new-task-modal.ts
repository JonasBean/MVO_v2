import { Component } from '@angular/core';
import { ViewController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'page-new-task-modal',
  templateUrl: 'new-task-modal.html'
})
export class NewTaskModalPage {

  validations_form: FormGroup;
  item: any;
  loading: any;

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad() {
    this.resetFields()
  }

  resetFields() {
    this.item = '';
    this.validations_form = this.formBuilder.group({
      image: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      wear: new FormControl('', Validators.required),
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
      this.firebaseService.createTask(data)
        .then(
          res => {
            this.resetFields();
            this.viewCtrl.dismiss();
          }
        )
    }
  }
}