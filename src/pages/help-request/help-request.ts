import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the HelpRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help-request',
  templateUrl: 'help-request.html',
})
export class HelpRequestPage {
  lat: any;
  long: any;
  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController,private http: Http) {
    this.lat = navParams.data.lat;
    this.long = navParams.data.long;
  }

  @ViewChild('persons_injured') persons_injured;
  @ViewChild('persons_trapped') persons_trapped;
  @ViewChild('other_info') other_info;

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpRequestPage');
  }

  eventfilter(){
    console.log(this.event)
  }

  report(){
    if(this.persons_injured.value==""){
        
          let alert = this.alertCtrl.create({
            message:"Persons injured field is empty!",
            buttons: ['OK']
          
          });
          
          alert.present();
        
        } else if(this.persons_trapped.value==""){
        
          let alert = this.alertCtrl.create({
            message:"Persons trapped field is empty!",
            buttons: ['OK']
  
          });
          
          alert.present();
         
      }else {
        var headers = new Headers();
      
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Headers' , 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        
        
        let options = new RequestOptions({ headers: headers });
        let data = {
          request_type_id : 2,
          person_to_check : null,
          event: this.event,
          persons_injured: this.persons_injured.value,
          persons_trapped: this.persons_trapped.value,
          other_info: this.other_info.value,
          request_lat: this.lat,
          request_long: this.long
        }
        console.log(data);
        this.http.post('http://localhost/eligtas/report.php', data, options)
        .map(res=> res.json())
        .subscribe((data: any) =>
        {
           // If the request was successful notify the user
           console.log(data);
           let alert = this.alertCtrl.create({
            message: "Request sent successfully!",
            buttons: ['OK']
            }); 
            this.navCtrl.setRoot('HcfMappingPage');
            alert.present();
            //this.navCtrl.setRoot('PilgrimProfilePage'); 
        },
        (error : any) =>
        {
          console.log(error);
          let alert2 = this.alertCtrl.create({
            title:"FAILED",
            subTitle: "Wrong input/s, try again!",
            buttons: ['OK']
            });

        alert2.present();
        });

      }
  }
  
}
