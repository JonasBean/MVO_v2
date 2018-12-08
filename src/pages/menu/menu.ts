import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { NewTaskModalPage } from '../new-task-modal/new-task-modal';
import { DetailsPage } from '../details/details';
import { LoginPage } from '../login/login';
import { SettingsPage } from '../settings/settings';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})

export class MenuPage {

  items = Array<any>();

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private firebaseService: FirebaseService
  ) { }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    let stammWahl = false;
    let jugendWahl = false;

    this.items = [];

    this.firebaseService.getUserSettings()
      .then(userData => {
        stammWahl = userData[0].payload.doc.data().stamm;
        jugendWahl = userData[0].payload.doc.data().jugend;
      });

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
    this.navCtrl.push(DetailsPage, {
      data: data
    })
  }

  openNewUserModal() {
    let modal = this.modalCtrl.create(NewTaskModalPage);
    modal.onDidDismiss(data => {
      this.getData();
    });
    modal.present();
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
