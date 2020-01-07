import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsAdminPage } from './settingsAdmin';

@NgModule({
  declarations: [
    SettingsAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsAdminPage),
  ],
})
export class SettingsAdminPageModule {}
