import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';
import { LoginPage } from '../login/login';
/**
 * Generated class for the HcfMappingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hcf-mapping',
  templateUrl: 'hcf-mapping.html',
})
export class HcfMappingPage {
  @ViewChild('map') mapContainer:ElementRef;
  map:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

   ionViewDidLoad() {
    console.log('ionViewDidLoad HcfMappingPage');
  }
    ionViewDidEnter(){
    this.loadmap();
  }

  loadmap(){
    // this.map = leaflet.map("map").fitWorld();
    // leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //   maxZoom: 18
    // }).addTo(this.map);
    // this.map.locate({
    //   setView: true,
    //   maxZoom: 10
    // }).on('locationfound', (e) => {
    //   console.log('found you');
    //   })
    var planes = [
      ["7C6B07",10.3502881,123.8988732],
      ["7C6B38",10.361011,123.9070701],
      ];
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 15
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('You are here');
        console.log(e.latitude,e.longitude);
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      var circle = leaflet.circle([e.latitude, e.longitude], {
        color: 'Green',
            fillColor: '#81C784',
          fillOpacity: 0.5,
          radius: 2000
      }).addTo(this.map);
      leaflet.marker([10.3502881,123.8988732]).on('click', () => {
        alert('Need Help');
        console.log(e.latitude,e.longitude);
      }).addTo(this.map);
      leaflet.marker([10.361011,123.9070701]).on('click', () => {
        alert('NJ');
        console.log(e.latitude,e.longitude);
      }).addTo(this.map);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
  }
  // 10.3502881,123.8988732
  // 10.361011,123.9070701

  PushReportEventPage(){
    this.navCtrl.push('EventReportPage');
  }

  PushCallForHelpPage(){
    this.navCtrl.push('HelpRequestPage');
  }

  PushCheckOnPage(){
    this.navCtrl.push('CheckPersonPage');
  }

}
