import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { NewTaskModalPage } from '../new-task-modal/new-task-modal';
import { DetailsPage } from '../details/details';
import { DetailsNoAdminPage } from '../detailsNoAdmin/detailsNoAdmin';
import { LoginPage } from '../login/login';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})

export class MenuPage {
  // primcolor 9e1212
  jugendColor = "#9e1212";
  stammColor = "#9e1212";
  items = Array<any>();
  admin = false;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private firebaseService: FirebaseService
  ) { }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    let stammWahl = false;
    let jugendWahl = false;
    let admin = false;

    this.items = [];

    this.firebaseService.getUserSettings()
      .then(userData => {
        stammWahl = userData[0].payload.doc.data().stamm;
        jugendWahl = userData[0].payload.doc.data().jugend;
        this.admin = userData[0].payload.doc.data().admin;
      });

    if(jugendWahl) {
      this.jugendColor = "#9e1212";
    } else {
      this.jugendColor = "LightGray";
    }

    if(stammWahl) {
      this.stammColor = "#9e1212";
    } else {
      this.stammColor = "LightGray";
    }

    this.firebaseService.getTasks()
      .then(tasks => {
        tasks.forEach(task => {
          if(stammWahl && task.payload.doc.data().stamm){
            this.items.push(task);
          }
          if(jugendWahl && task.payload.doc.data().jugend){
            this.items.push(task);
          }
        });
      })
  }

  jugendActDeact(){
    if (this.jugendColor != "LightGray"){
      this.jugendColor = "LightGray";
    } else {
      this.jugendColor = "#9e1212";
    }
  }

  stammActDeact(){
    if (this.stammColor != "LightGray"){
      this.stammColor = "LightGray";
    } else {
      this.stammColor = "#9e1212";
    }
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

    if(this.admin){
      this.navCtrl.push(DetailsNoAdminPage, {
        data: data
      })
    } else {
      this.navCtrl.push(DetailsNoAdminPage, {
        data: data
      })
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
        this.navCtrl.push(LoginPage);
      })
  }

  settings() {
    this.navCtrl.push(SettingsPage);
  }

}
