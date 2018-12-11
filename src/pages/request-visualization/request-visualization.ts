import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import leaflet from 'leaflet';
import 'leaflet-routing-machine';
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
  nj:any;
  elijah:any;
  // marker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController) {
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
    leaflet.marker([10.3502881,123.8988732]).on('click', () => {
        //alert('Hospital x');
        this.presentConfirm();
      }).bindPopup("Need Help!").addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 15
    }).on('locationfound', (e) => {
      this.nj= e.latitude;
      this.elijah= e.longitude;
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude])
      // leaflet.Routing.control({
      //   waypoints: [
      //     leaflet.latLng(10.3502881, 123.8988732),
      //     leaflet.latLng(this.nj, this.elijah)
      //   ]
      // }).addTo(this.map)
      .on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
  }
  
  pushRespondToRequest(){
    this.navCtrl.push('RespondToRequestPage');
  }
  change(){
    
    var a=10.3502881;
    var b=123.8988732;
    var greenIcon = new leaflet.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    console.log("nj gwapo");
    // leaflet.Routing.control({
    //   waypoints: [
    //     leaflet.latLng(10.3502881, 123.8988732),
    //     leaflet.latLng(this.nj, this.elijah)
    //   ]
    // }).addTo(this.map)
    leaflet.marker([a,b], {icon: greenIcon}).addTo(this.map).on('click', () => {
      // Draggable : false;
      //alert('Hospital x');
      this.presentConfirm();
    }).bindPopup("Need help")
    // leaflet.Routing.control({
    //   waypoints: [
    //     leaflet.latLng(10.3502881, 123.8988732),
    //     leaflet.latLng(this.nj, this.elijah)
    //   ]
      
    // }).addTo(this.map)
    // leaflet.Routing.control({
    //   waypoints: [
    //     leaflet.latLng(a, b),
    //     leaflet.latLng(57.6792, 11.949)
    //   ]
    // }).addTo(this.map);
  }
  change1(){
    var greenIcon = new leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    console.log("nj gwapo");
    leaflet.marker([10.3502881,123.8988732], {icon: greenIcon}).addTo(this.map).on('click', () => {
      //alert('Hospital x');
      this.presentConfirm();
    }).bindPopup("Cancel aid?");
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Response',
      message: 'Do you want to respond?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.change1();
          }
        },
        {
          text: 'Help',
          handler: () => {
            console.log('Buy clicked');
            this.change();
            // var greenIcon = new leaflet.Icon({
            //   iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            //   iconSize: [25, 41],
            //   iconAnchor: [12, 41],
            //   popupAnchor: [1, -34],
            //   shadowSize: [41, 41]
            // });
            // console.log("nj gwapo");
            // leaflet.marker([51.5, -0.09], {icon: greenIcon}).addTo(this.map);
          }
        }
      ]
    });
    alert.present();
  }
}
