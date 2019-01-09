import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';

/**
 * Generated class for the ChangePinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-pin',
  templateUrl: 'change-pin.html',
})
export class ChangePinPage {
  map:any;
  lat: any;
  long: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePinPage');
  }

  ionViewDidEnter(){
    if(this.map != null){
      this.map.remove();
      console.log("Entered != null");
    }
    this.loadmap();
  }

  loadmap(){
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
        console.log(this.lat,this.long);
      }).bindPopup("You are here xd")
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      
      this.lat = e.latitude;
      this.long = e.longitude;
      // leaflet.marker([10.3502881,123.8988732]).on('click', () => {
      //   alert('Hospital x');
      //   console.log(e.latitude,e.longitude);
      // }).addTo(this.map);
      // leaflet.marker([10.361011,123.9070701]).on('click', () => {
      //   alert('Evacuation Center');
      //   console.log(e.latitude,e.longitude);
      // }).addTo(this.map);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
  }
}
