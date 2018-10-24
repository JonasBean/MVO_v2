import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  cardItems: any[];

  constructor(public navCtrl: NavController) {
    this.cardItems = [
      {
        appointment: {
          appointmentKind: 'Probe',
          date: '30.10.2018',
          time: '20 Uhr'
        },
        wear: 'Uniform',
        content: 'Probeprobeprobeprobe Dummydaten!',
      },
      {
        appointment: {
          appointmentKind: 'Ständchen',
          date: '05.11.2018',
          time: '16.30 Uhr'
        },
        wear: 'Zivil',
        content: 'Ständchenständchenständchen Dummydaten!',
      }
    ];

  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

}
