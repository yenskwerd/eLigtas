import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  items: any = ["asd", "asd", "asd"];

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  public openModal(){ 
    var modalPage = this.modalCtrl.create('ModalPage'); 
    modalPage.present(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

}
