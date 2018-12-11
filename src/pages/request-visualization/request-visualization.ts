import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, AlertController,  NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';

/**
 * Generated class for the RequestVisualizationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-visualization',
  templateUrl: 'request-visualization.html',
})
export class RequestVisualizationPage {
  @ViewChild('map') mapContainer:ElementRef;
  map:any;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad visualization');
  }
  ionViewDidEnter(){
    if(this.map != null){
      this.map.remove();
      console.log("Entered != null");
    }
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
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
    leaflet.marker([10.3502881,123.8988732]).on('click', () => {
      leaflet.marker([10.3502881,123.8988732], {icon: greenIcon}).addTo(this.map);
      if(this.responseConfirm()==false){
      console.log(this.ret);
      leaflet.marker([10.3502881,123.8988732], {icon: blueIcon}).addTo(this.map);
    }
    }).bindPopup("Need help").addTo(this.map);
    var greenIcon = new leaflet.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    var blueIcon = new leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    
    
    
  }
  
  ret:any;
  pushRespondToRequest(){
    this.navCtrl.push('RespondToRequestPage');
  }
  responseConfirm(): boolean {
    
    let alert = this.alertCtrl.create({

      title: 'Confirm response',
      message: 'Do you want help this person?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.ret = false;
            console.log(this.ret);
          }
        },
        {
          text: 'Help',
          handler: () => {
            console.log('Please hurry!');
            this.ret = true;
          }
        }
      ]
    });
    console.log(this.ret);
    alert.present();
    return this.ret;
  }

}


