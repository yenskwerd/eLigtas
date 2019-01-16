import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';
import { HttpClient } from '@angular/common/http';  
import { LoginPage } from '../login/login';
import { dateValueRange } from 'ionic-angular/umd/util/datetime-util';
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
  currLat:any;
  currLong:any;
  lat: any;
  long: any;
  hcfshow: any;
  request: any;
  hcfMarkers: any[];

  constructor(public navCtrl: NavController, public http : HttpClient, public navParams: NavParams) {
    this.hcfMarkers = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HcfMappingPage');
  }

  ionViewDidEnter(){
    if(this.map != null){
      this.map.remove();
      console.log("Entered != null");
    }
    this.loadmap();
  }
  
  ionViewDidLeave() {
    // this.map = null;
    //leaflet.map("map").fitWorld = null;
    // document.getElementById('map').outerHTML = "";
    console.log("left");

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
        console.log(this.lat,this.long);
      }).bindPopup("You are here xd")
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      var circle = leaflet.circle([e.latitude, e.longitude], {
        color: 'Green',
            fillColor: '#81C784',
          fillOpacity: 0.5,
          radius: 2000
      }).addTo(this.map);
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
    console.log(this.map);
  }
  // 10.3502881,123.8988732
  // 10.361011,123.9070701

  PushReportEventPage(){
    this.navCtrl.push('EventReportPage', {
      lat: this.lat,
      long: this.long
    });
  }

  PushCallForHelpPage(){
    this.navCtrl.push('HelpRequestPage', {
      lat: this.lat,
      long: this.long
    });
  }

  PushCheckOnPage(){
    this.navCtrl.push('CheckPersonPage', {
      lat: this.lat,
      long: this.long
    });
  }

  showHCF(){
    this.http
       .get('http://172.16.30.28/eligtas/retrieve-emergencies.php')
       .subscribe((data : any) =>
       {
          console.log(data);
          this.request = data;
          if(this.hcfshow == true){
            for(let i=0; i<data.length; i++){
              this.createMarker(data[i], i);
            }
            console.log("true");
          }else{
            for(let i=0; i<this.hcfMarkers.length; i++){
              this.deleteMarker(i);
            }
            console.log("false");
          }
          
       },
       (error : any) =>
       {
          console.dir(error);
       });  
  }

  /********** SHOW MARKERS ************/
  createMarker(data:any, i:any){
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

    //in db, there is a column "type" which contains the type of emergency facility
    if(data.type == "Hospital"){
      this.hcfMarkers[i] = leaflet.marker([data.request_lat,data.request_long], {icon: purpleIcon}).bindTooltip(data.name, 
      {
          permanent: true, 
          direction: 'bottom'
      }
  ).addTo(this.map);
    }else if(data.type=="Fire Station"){
      this.hcfMarkers[i] = leaflet.marker([data.request_lat,data.request_long], {icon: yellowIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
    ).addTo(this.map);
    }else if(data.type=="Police Station"){
      this.hcfMarkers[i] = leaflet.marker([data.request_lat,data.request_long], {icon: grayIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
    ).addTo(this.map);
    }else{
      this.hcfMarkers[i] = leaflet.marker([data.request_lat,data.request_long], {icon: blackIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
    ).addTo(this.map);
    }
    
  }
  /******** END SHOW MARKERS **********/

  /********** UNSHOW MARKERS ************/
  deleteMarker(i:any){
    this.map.removeLayer(this.hcfMarkers[i]);
  }
  /******** END UNSHOW MARKERS **********/

}
