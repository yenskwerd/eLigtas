import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestVisualizationPage } from './request-visualization';

@NgModule({
  declarations: [
    RequestVisualizationPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestVisualizationPage),
  ],
})
export class RequestVisualizationPageModule {}
