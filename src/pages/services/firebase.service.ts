import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class FirebaseService {

  private snapshotChangesSubscription: any;
  constructor(public afs: AngularFirestore) { }

  getTasks() {
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.afs.collection('calendar').doc('stamm').collection('tasks').snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
    });
  }

  updateTask(taskKey, value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('calendar').doc('stamm').collection('tasks').doc(taskKey).set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  deleteTask(taskKey) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('calendar').doc('stamm').collection('tasks').doc(taskKey).delete()
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  createTask(value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('calendar').doc('stamm').collection('tasks').add({
        title: value.title,
        description: value.description,
        image: value.image,
        date: value.date,
        wear: value.wear,
        stamm: value.stamm,
        jugend: value.jugend
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  createUserSettings(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('userData').add({
        name: value.name,
        part: value.part,
        stamm: value.stamm,
        jugend: value.jugend,
        admin: value.admin
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  updateUserSettings(id, value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('userData').doc(id).set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  getUserSettings() {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('userData').snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
    });
  }

  getEmailVerification() {
    let emailVarified = firebase.auth().currentUser.emailVerified;
    return emailVarified;
  }

}
