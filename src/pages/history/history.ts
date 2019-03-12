import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

import { RequestVisualizationPage } from '../request-visualization/request-visualization';
/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  public items : any = [];
  history: any = [];
  color: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http   : Http, public loginService: LoginServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    this.load();
    
  }


  load() : void
  {
    var headers = new Headers();
      
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Headers' , 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    
    let options = new RequestOptions({ headers: headers });

    let data = {
      user_id: this.loginService.logged_in_user_id
    }

     this.http.post('http://usc-dcis.com/eligtas.app/retrieve-history.php',data,options)
    //  .map(res=> res.json())
    //    .subscribe(
    //      res => {
    //       this.items = res;
    //       this.generateHistory(res);
    //       console.log(res);
    //  });  
    .map(res=> res.json())
    .subscribe((data: any) =>
    {
       console.log(data);
       this.items = data;
       this.generateHistory(data);
    },
    (error : any) =>
    {
      console.dir(error);
    }); 
  }

  
  generateHistory(data) {
    console.log(data.request_id);
    for (let i=0; i < data.length; i++) {
      if (data[i].request_status_id == null) {
        this.color = "Purple"
      } else if (data[i].request_status_id == 0) {
        this.color = "light"
      } else if (data[i].request_status_id == 1) {
        this.color = "Yellow"
      } else if (data[i].request_status_id == 2) {
        this.color = "Gray"
      }
      this.history.push(
        { request_id: data[i].request_id,
          action: data[i].action,
          action_datetime: data[i].action_datetime,
          color: this.color
        }
      );
    }
  }

}
