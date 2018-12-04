import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RespondToRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-respond-to-request',
  templateUrl: 'respond-to-request.html',
})
export class RespondToRequestPage {
  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = "Fire";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RespondToRequestPage');
  }

  isReadonly() {return true;}
  pushRequestVisualizationPage(){
    this.navCtrl.push('RequestVisualizationPage');
  }

  pushCallForBackupPage(){
    this.navCtrl.push('CallForBackupPage');
  }
  

}
