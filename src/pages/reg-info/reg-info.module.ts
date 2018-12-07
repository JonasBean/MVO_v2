import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegInfoPage } from './reg-info';

@NgModule({
  declarations: [
    RegInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegInfoPage),
  ],
})
export class RegInfoPageModule {}
