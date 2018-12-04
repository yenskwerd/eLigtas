import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HcfMappingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hcf-mapping',
  templateUrl: 'hcf-mapping.html',
})
export class HcfMappingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HcfMappingPage');
  }

  PushReportEventPage(){
    this.navCtrl.push('EventReportPage');
  }

  PushCallForHelpPage(){
    this.navCtrl.push('HelpRequestPage');
  }

  PushCheckOnPage(){
    this.navCtrl.push('CheckPersonPage');
  }

}
