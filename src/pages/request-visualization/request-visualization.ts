import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';  
import leaflet, { Draggable, marker } from 'leaflet';
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
  marker: any;
  request: any;

  constructor(public navCtrl: NavController, public http : HttpClient, public navParams: NavParams, public alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
  
  }
  ionViewDidEnter(){
    if(this.map != null){
      this.map.remove();
      console.log("Entered != null");
    }
    this.loadmap();
  }
  ioniViewCanLeave(){
    // this.map = null;
    //leaflet.map("map").fitWorld = null;
    // document.getElementById('map').outerHTML = "";
    this.map.remove();
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
    // leaflet.marker([10.3502881,123.8988732],{draggable:false}).on('click', () => {
    //     //alert('Hospital x');
    //     this.presentConfirm();
    //   }).bindPopup("Need Help!").addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 15
    }).on('locationfound', (e) => {
      this.nj= e.latitude;
      this.elijah= e.longitude;
      let markerGroup = leaflet.featureGroup();
      this.marker= leaflet.marker([e.latitude, e.longitude],{draggable:false})
      .on('click', () => {
        alert('You are here!');
      })
      markerGroup.addLayer(this.marker);
      this.map.addLayer(this.marker);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
    // leaflet.marker([10.3502881,123.8988732]).on('click', () => {
    //   leaflet.marker([10.3502881,123.8988732], {icon: greenIcon}).addTo(this.map);
    //   if(this.responseConfirm()==false){
    //   console.log(this.ret);
    //   leaflet.marker([10.3502881,123.8988732], {icon: blueIcon}).addTo(this.map);
    // }
    // }).bindPopup("Need help").addTo(this.map);
    this.http
     .get('http://localhost/eligtas/retrieve-request.php')
     .subscribe((data : any) =>
     {
        console.log(data);
        this.request = data;
        // this.generateParish(data);
        for(let i=0; i<data.length; i++){
          this.createMarker(data[i].request_lat, data[i].request_long);
          console.log('lolol')
        }
     },
     (error : any) =>
     {
        console.dir(error);
     });   
  
    
    
    
  }

  createMarker(lat:any, long:any){
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
    leaflet.marker([lat,long]).on('click', () => {
      leaflet.marker([lat,long], {icon: greenIcon}).addTo(this.map);
      this.presentConfirm();
      console.log(this.ret);
      leaflet.marker([10.3502881,123.8988732], {icon: blueIcon}).addTo(this.map);
    
    }).bindPopup("Need help").addTo(this.map);
  }
  
  ret:any;
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
            
          }
        }
      ]
    });
    console.log(this.ret);
    alert.present();
    return this.ret;
  
  }
  
  pushRespondToRequest(){
    this.navCtrl.push('RespondToRequestPage');
  }
  change(){
    this.map.removeLayer(this.marker)

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
    leaflet.marker([a,b], {icon: greenIcon, draggable:false}).addTo(this.map).on('click', () => {
    
      //alert('Hospital x');
      this.presentConfirm();
    }).bindPopup("Need help")
    // this.map.addLayer(this.marker);
    // leaflet.Routing.control({
    //   waypoints: [
    //     leaflet.latLng(10.3502881, 123.8988732),
    //     leaflet.latLng(this.nj, this.elijah)
    //   ]
      
    // }).addTo(this.map)
  }
  rout(){
  
    leaflet.Routing.control({
      waypoints: [
        leaflet.latLng(10.3502881, 123.8988732),
        leaflet.latLng(this.nj, this.elijah)
      ],routeWhileDragging:false
      
    }).addTo(this.map)
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
    leaflet.marker([10.3502881,123.8988732], {icon: greenIcon,draggable:false,}).addTo(this.map).on('click', () => {
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
            this.navCtrl.push('RespondToRequestPage');
            this.change1();
          }
        },
        {
          text: 'Help',
          handler: () => {
            console.log('Buy clicked');
            this.change();
            this.pushRespondToRequest();
            this.navCtrl.push('RespondToRequestPage');
            //this.change();
            //this.rout();
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

