import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';  

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
  request: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http   : HttpClient) {
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
  
  load() : void
  {
     this.http
     .get('http://localhost/eligtas/retrieve-request.php')
     .subscribe((data : any) =>
     {
        console.dir(data);
        this.request = data;
        // this.generateParish(data);
     },
     (error : any) =>
     {
        console.dir(error);
     });   
  }

}
