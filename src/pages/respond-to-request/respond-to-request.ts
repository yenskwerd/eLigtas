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
  items: any;
  request: any = [];
  event: any;
  injured: any;
  trapped: any;
  other: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http   : HttpClient) {
    this.event = navParams.data.event;
    this.injured = navParams.data.persons_injured;
    this.trapped = navParams.data.persons_trapped;
    this.other = navParams.data.other_info;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RespondToRequestPage');
    this.load();
  }

  isReadonly() {return true;}
  
  pushRequestVisualizationPage(){
    this.navCtrl.push('RequestVisualizationPage');
  }

  pushCallForBackupPage(){
    this.navCtrl.push('CallForBackupPage');
  }

  // getResult(data){
  //   // for (let i=0; i < data.length; i++) {
  //     this.request.push(
  //       { 
  //         event: data[0].event,
  //         injured: data[0].persons_injured,
  //         trapped: data[0].persons_trapped,
  //         other: data[0].other_info
  //       }
  //     );
  //   // }
  // }
  
  load() : void
  {
     this.http
     .get('http://localhost/eligtas/retrieve-request.php')
     .subscribe((data : any) =>
     {
        console.dir(data);
        this.items = data;
        // this.getResult(data);
     },
     (error : any) =>
     {
        console.dir(error);
     });   
  }

}
