import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { FirebaseService } from '../services/firebase.service';
import { NewTaskModalPage } from '../new-task-modal/new-task-modal';
import { DetailsPage } from '../details/details';
import { DetailsNoAdminPage } from '../detailsNoAdmin/detailsNoAdmin';
import { LoginPage } from '../login/login';
import { SettingsPage } from '../settings/settings';
import { SettingsAdminPage } from '../settingsAdmin/settingsAdmin';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})

export class MenuPage {
  // primcolor 9e1212
  jugendColor = "#9e1212";
  stammColor = "#9e1212";
  jugendWahl = false;
  stammWahl = false;
  items = Array<any>();
  admin = false;
  emailVerified = false;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private storage: Storage
  ) {}

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.items = [];
    this.emailVerified = this.firebaseService.getEmailVerification();
    this.firebaseService.getUserSettings()
      .then(userData => {
        this.stammWahl = userData[0].payload.doc.data().stamm;
        this.jugendWahl = userData[0].payload.doc.data().jugend;
        this.admin = userData[0].payload.doc.data().admin;
      });

    if(this.jugendWahl) {
      this.jugendColor = "#9e1212";
    } else {
      this.jugendColor = "LightGray";
    }

    if(this.stammWahl) {
      this.stammColor = "#9e1212";
    } else {
      this.stammColor = "LightGray";
    }

    this.firebaseService.getTasks()
      .then(tasks => {
        tasks.forEach(task => {
          if(this.stammWahl && task.payload.doc.data().stamm){
            this.items.push(task);
          }
          if(this.jugendWahl && task.payload.doc.data().jugend){
            this.items.push(task);
          }
        });
      })
  }

  jugendActDeact(){
    this.jugendWahl = !this.jugendWahl;
    if (this.jugendColor != "LightGray"){
      this.jugendColor = "LightGray";
    } else {
      this.jugendColor = "#9e1212";
    }
    this.getData();
  }

  stammActDeact(){
    this.stammWahl = !this.stammWahl;
    if (this.stammColor != "LightGray"){
      this.stammColor = "LightGray";
    } else {
      this.stammColor = "#9e1212";
    }
    this.getData();

  }

  viewDetails(id, item) {
    // debugger
    let data = {
      image: item.image,
      title: item.title,
      date: item.date,
      description: item.description,
      wear: item.wear,
      stamm: item.stamm,
      jugend: item.jugend,
      id: id
    }

    if(this.emailVerified){
      if(!this.admin){
        this.navCtrl.push(DetailsNoAdminPage, {
        data: data
        })
      } else {
          this.navCtrl.push(DetailsPage, {
          data: data
          })
        }
    }
    else {
      alert("Bitte vorher deine Email-Adresse bestätigen!")
    }
  }

  openNewUserModal() {
    if(this.admin){
      let modal = this.modalCtrl.create(NewTaskModalPage);
      modal.onDidDismiss(data => {
        this.getData();
      });
      modal.present();
    } else {
      alert("Sie können keinen Termin erstellen - fehlende Admin-Rechte");
    }
  }

  logout() {
    this.authService.doLogout()
      .then(res => {
        this.storage.clear();
        this.navCtrl.push(LoginPage);
      })
  }

  settings() {
    this.navCtrl.push(SettingsPage);
  }

  settingsAdmin() {
    this.navCtrl.push(SettingsAdminPage);
  }
}
