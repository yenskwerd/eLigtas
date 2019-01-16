import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import 'rxjs/add/operator/map';
import { HTTP } from '@ionic-native/http';

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

  constructor(public navCtrl: NavController, public loading:LoadingController, private http: Http, public alertCtrl: AlertController, public navParams: NavParams,
    public loginService: LoginServiceProvider) {
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
        
          if(res != "Your username or password is invalid!"){
            this.loginService.loginState = res.specUser_id;
            this.loginService.logged_in_user_id = res.user_id;
            this.loginService.logged_in_user_request_id = res.request_id
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
            console.log(res.user_id);
            
            alert.present();
            if(this.loginService.loginState == 1){
              this.navCtrl.setRoot('HcfMappingPage');
            }else{
              this.navCtrl.setRoot('RequestVisualizationPage');
            }
            
          }else{
            let alert = this.alertCtrl.create({
            subTitle:"Your Username or Password is invalid",
            buttons: ['OK']
            });
            
            alert.present();
           }
        }); 

        });
    }
  }
}
