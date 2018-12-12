import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';
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
  request_status_id;
  request_id;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http   : Http, public loading:LoadingController) {
    this.event = navParams.data.event;
    this.injured = navParams.data.persons_injured;
    this.trapped = navParams.data.persons_trapped;
    this.other = navParams.data.other_info;
    this.request_status_id=navParams.data.request_status_id;
    this.request_id=navParams.data.request_id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RespondToRequestPage');
    this.load();
  }

  isReadonly() {return true;}
  
  pushRequestVisualizationPage(){
    this.navCtrl.setRoot('RequestVisualizationPage');
  }

  pushCallForBackupPage(){
    var headers = new Headers();
      
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Headers' , 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    
    let options = new RequestOptions({ headers: headers });
    let data = {
    
    request_status_id: this.request_status_id,
    request_id: this.request_id
  
    }
    let loader = this.loading.create({
    });
  
    loader.present().then(() => {
      this.http.post('http://localhost/eligtas/update-rescue.php',data,options)
      .map(res=> res.json())
        .subscribe(
          res => {
          loader.dismiss()
          console.log(res)
          });
    this.navCtrl.setRoot('RequestVisualizationPage');
    //  location.reload();
        });
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
