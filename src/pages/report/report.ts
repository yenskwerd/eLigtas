import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { HttpClient } from '@angular/common/http'; 

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

  public items : Array<any> = [];
  reports: any = [];
  value: any;
  hello: any;

  constructor(public modalCtrl: ModalController, private http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    this.hello = navParams.data.data;
  }

  public openModal(){ 
    var modalPage = this.modalCtrl.create('ModalPage');
    modalPage.onDidDismiss(data => {
      console.log(data);
      this.value=data;//here
      console.log(JSON.stringify(this.value,undefined,2));
      console.log(this.hello);
    });
    modalPage.present(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
    this.load();
  }


  load() : void
  {
     this.http
     .get('http://usc-dcis.com/eligtas.app/retrieve-report.php')
     .subscribe((data : any) =>
     {
        console.dir(data);
        this.items = data;
        console.log("this: " + this.items);
        this.generateItems(data);
     },
     (error : any) =>
     {
        console.dir(error);
     });
  }

  generateItems(data) {
    for (let i=0; i < data.length; i++) {
      if(data[i].victim_name!="") {
        this.reports.push(
          { victim_name: data[i].victim_name,
            victim_desc: data[i].victim_desc,
            triage: data[i].triage
          }
        );
      }
    }
  }

}
