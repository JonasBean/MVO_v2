import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';

import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items) {
    this.item = navParams.get('item') || items.defaultItem;
  }

  ionViewDidLoad() {
        var myChart = HighCharts.chart('container', {
      chart: {
        type: 'scatter'
      },
      title: {
        text: 'Besetzung'
      },
      xAxis: {
        lineWidth: 0,
        labels: {
            enabled: false
        }
      },
      yAxis: {
        lineWidth: 0,
        labels: {
            enabled: false
        }
      },
      series: [{
        name: 'Klarinetten 1',
        data: [[161.2, 51.6], [167.5, 59.0]]
      }, {
        name: 'John',
        data: [5, 7, 3]
      }]
    });
  }
}
