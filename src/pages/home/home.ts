import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  PushSignupPage(){
    this.navCtrl.push('SignupPage');
  }

  PushLoginPage(){
    this.navCtrl.push('LoginPage');
  }
}
