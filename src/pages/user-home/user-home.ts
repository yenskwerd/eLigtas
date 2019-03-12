import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the UserHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-home',
  templateUrl: 'user-home.html',
})
export class UserHomePage {
  lat: any;
  long: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.lat = navParams.data.lat;
    this.long = navParams.data.long;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserHomePage');
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  PushReportEventPage(){
    this.navCtrl.setRoot('EventReportPage', {
      lat: this.lat,
      long: this.long
    });
  }

  PushCallForHelpPage(){
    this.navCtrl.setRoot('HelpRequestPage', {
      lat: this.lat,
      long: this.long
    });
  }

  PushCheckOnPage(){
    this.navCtrl.setRoot('CheckPersonPage', {
      lat: this.lat,
      long: this.long
    });
  }

}
