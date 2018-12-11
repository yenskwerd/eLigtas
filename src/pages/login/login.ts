import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public loading:LoadingController, private http: Http, public alertCtrl: AlertController, public navParams: NavParams) {
  }

  @ViewChild('username') username;
  @ViewChild('password') password; 

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  /**********************************
   * Citizen Login                  *
   *********************************/
  pushCitizenHomePage(){
    this.navCtrl.push('HcfMappingPage');
  }

  /**********************************
  * Responder Login                 *
  **********************************/
  pushResponderHomePage(){
    this.navCtrl.push('RequestVisualizationPage');
  }

  logIn(){
    if(this.username.value==""){
    
      let alert = this.alertCtrl.create({
      subTitle:"Pilgrim ID field is empty",
      buttons: ['OK']
      


      });
      
      alert.present();
    
    } else if(this.password.value==""){
    
      let alert = this.alertCtrl.create({
      subTitle:"Password field is empty",
      buttons: ['OK']
      
      });
      
      alert.present();
    
    }else{
    
      var headers = new Headers();
      
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Headers' , 'Content-Type');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      
      let options = new RequestOptions({ headers: headers });
      let data = {
      
      username: this.username.value,
      password: this.password.value
    
      }
      let loader = this.loading.create({
      });
    
      loader.present().then(() => {
        this.http.post('http://localhost/eligtas/login.php',data,options)
        .map(res=> res.json())
          .subscribe(
            res => {
            loader.dismiss()
            console.log(res)
        
          if(res == "Login Success!"){
            // this.loginService.loginState = 1;
            // this.events.publish('user:sidebar');
            let alert = this.alertCtrl.create({
            subTitle: "You successfully logged in!",
            buttons: ['OK']
            });
            // this.storage.set('username', this.username.value).then((val) =>{
            //   this.storage.get('username').then((val) => {
            //     console.log(val);
            //   });
            // });
            // this.storage.set('password', this.password.value).then((val) =>{
            //   this.storage.get('password').then((val) => {
            //     console.log(val);
            //   });
            // });
            
            alert.present();
            this.navCtrl.setRoot('HomePage');
          }else{
            let alert = this.alertCtrl.create({
            subTitle:"Your Pilgrim ID or Password is invalid",
            buttons: ['OK']
            });
            
            alert.present();
           }
        }); 

        });
    }
  }
}
