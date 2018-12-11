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
  index: any;

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
    var redIcon = new leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });  
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 15
    }).on('locationfound', (e) => {
      this.nj= e.latitude;
      this.elijah= e.longitude;
      let markerGroup = leaflet.featureGroup();
      //this.marker= leaflet.marker([e.latitude, e.longitude],{draggable:false})
      this.marker=leaflet.marker([e.latitude,e.longitude], {icon: redIcon,draggable:false}).addTo(this.map)
      .on('click', () => {
        alert('You are here!');
      })
      markerGroup.addLayer(this.marker);
      this.map.addLayer(this.marker);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
    this.http
     .get('http://localhost/eligtas/retrieve-request.php')
     .subscribe((data : any) =>
     {
        console.log(data);
        this.request = data;
        // this.generateParish(data);
        for(let i=0; i<data.length; i++){
          this.createMarker(data[i]);
          console.log('lolol')
        }
     },
     (error : any) =>
     {
        console.dir(error);
     });   
  
    
    
    
  }

  createMarker(data:any){
    var purpleIcon = new leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    var yellowIcon = new leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });  
    var grayIcon = new leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });  
    var blackIcon = new leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
      shadowUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });  
    if(data.request_status_id==0){
      leaflet.marker([data.request_lat,data.request_long], {icon: purpleIcon}).addTo(this.map).on('click', () => {
        this.presentConfirm(data);
      }).bindPopup("Need help").addTo(this.map);
      // leaflet.marker([data.request_lat,data.request_long]).on('click', () => {
      //   this.presentConfirm(data);
      // }).bindPopup("Need help").addTo(this.map);
    } else if(data.request_status_id==1){
      leaflet.marker([data.request_lat,data.request_long], {icon: yellowIcon}).addTo(this.map).on('click', () => {
        this.presentConfirm(data);
      }).bindPopup("Need help").addTo(this.map);
    } else if(data.request_status_id==2){
      leaflet.marker([data.request_lat,data.request_long], {icon: grayIcon}).addTo(this.map);
    }
    
  }
  
  ret:any;
 
  
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
    leaflet.marker([a,b], {icon: greenIcon, draggable:false}).addTo(this.map).on('click', () => {
    
      //alert('Hospital x');
      // this.presentConfirm();
    }).bindPopup("Need help")
   
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
      // this.presentConfirm();
    }).bindPopup("Cancel aid?");
  }
  presentConfirm(data) {
    let alert = this.alertCtrl.create({
      title: 'Response',
      message: 'Do you want to respond?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            // this.navCtrl.push('RespondToRequestPage');
            this.change1();
          }
        },
        {
          text: 'Help',
          handler: () => {
            console.log('Buy clicked');
            this.change();
            this.pushRespondToRequest();
            this.navCtrl.push('RespondToRequestPage', {
              person_to_check: data.person_to_check,
              event: data.event,
              persons_injured: data.persons_injured,
              persons_trapped: data.persons_trapped,
              other_info: data.other_info,
              request_lat: data.request_lat,
              request_long: data.request_long
            });
            console.log(data.request_id);
            console.log(data.event);
          }
        }
      ]
    });
    alert.present();
  }

  
}

