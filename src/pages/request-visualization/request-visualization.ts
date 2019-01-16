import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';  
import {Http, Headers, RequestOptions}  from '@angular/http';
import leaflet, { Draggable, marker } from 'leaflet';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import 'leaflet-routing-machine';
import 'rxjs/add/operator/map';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { getOrCreateNodeInjectorForNode } from '@angular/core/src/render3/di';

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
  requestshow: any;
  requestMarkers: any;
  map:any;
  currLat:any;
  currLong:any;
  // marker: any;
  marker: any;
  marker2: any;
  request: any;
  index: any;
  user_request_id: any;
  dataRefresher: any;
  markerGroup = leaflet.featureGroup();
  markerGroup2 = leaflet.featureGroup();
  constructor(public navCtrl: NavController, public http : HttpClient, public http2 : Http, public navParams: NavParams, public alertCtrl : AlertController,
    public loginService: LoginServiceProvider) {
      this.requestMarkers = [];
  }

  ionViewDidLoad() {
    console.log("loaded");
    //this.getUserRequest();
  }
  ionViewWillEnter(){
  }
  ionViewDidEnter(){
    // if(this.map != null){
 //      this.map.remove();
    //   console.log("Entered != null");
    // }
    this.loadmap();
  }

  ionViewDidLeave() {
    // this.map = null;
    //leaflet.map("map").fitWorld = null;
    // document.getElementById('map').outerHTML = "";
    console.log("left");
    this.map.remove();
  }

  getUserRequest(){
    //gets user data
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
    console.log(data);

   this.http2.post('http://172.16.30.28/eligtas/retrieve-user-request.php',data,options)
   .map(res=> res.json())
     .subscribe(
       res => {
       console.log(res.request_id);
       this.user_request_id = res.request_id;
   }); 
  }

  loadmap(){
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
    console.log(data);

   this.http2.post('http://172.16.30.28/eligtas/retrieve-user-request.php',data,options)
   .map(res=> res.json())
     .subscribe(
       res => {
       console.log(res.request_id);
       this.user_request_id = res.request_id;


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
        maxZoom: 15,
        watch: true,
        enableHighAccuracy: true
      }).on('locationfound', (e) => {
        this.currLat= e.latitude;
        this.currLong= e.longitude;
        //  let markerGroup2 = leaflet.featureGroup();
        //this.marker= leaflet.marker([e.latitude, e.longitude],{draggable:false})
        this.marker=leaflet.marker([e.latitude,e.longitude], {icon: redIcon,draggable:false})
        .on('click', () => {
          alert('You are here!');
        })
        this.markerGroup2.addLayer(this.marker);
        this.map.addLayer(this.marker);
        }).on('locationerror', (err) => {
          alert(err.message);
      })

      this.requestMarker();
  }); 
}
requestMarker(){
  this.dataRefresher = setInterval(() =>{
    this.http
     .get('http://172.16.30.28/eligtas/retrieve-request.php')
     .subscribe((data : any) =>
     {
      // this.map.removeLayer(this.markerGroup);
      //this.map.removeLayer(this.markerGroup2);
      //this.dataRefresher = setInterval(() =>{
        //console.log(data);
        this.request = data;
        //this.map.removeLayer(this.markerGroup);
        // this.generateParish(data);
        this.markerGroup.clearLayers();
        for(let i=0; i<data.length; i++){
          // this.markerGroup.clearLayers();
          
          this.createMarker2(data[i]);
          // this.markerGroup.clearLayers();
          //console.log('lolol')

        }
        //console.log(this.markerGroup);
        // this.map.removeLayer(this.markerGroup);
        // this.markerGroup2.clearLayers();
        // this.map.removeLayer(this.markerGroup2);
      // },1000);
      // this.map.removeLayer(this.markerGroup);
    },
     (error : any) =>
     {
        console.dir(error);
     });
     },1000);
  
}
  
    
  

  createMarker2(data:any){
    //this.map.removeLayer(this.markerGroup);
    //this.markerGroup.clearLayers();
      // this.map.removeLayer(this.markerGroup2);
      // this.map.removeLayer(this.marker2);
   // let markerGroup = leaflet.featureGroup();
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
      this.marker2=leaflet.marker([data.request_lat,data.request_long], {icon: purpleIcon}).on('click', () => {
        this.presentConfirm(data);

        // this.markerGroup.addLayer(this.marker2);
      })
      // markerGroup.addLayer(this.marker2);
      // this.map.addLayer(this.marker2);
      //}).bindPopup("Need help").addTo(this.map);
      
      // leaflet.marker([data.request_lat,data.request_long]).on('click', () => {
      //   this.presentConfirm(data);
      // }).bindPopup("Need help").addTo(this.map);

    } else if(data.request_status_id==1 || data.request_id == this.user_request_id){
      this.rout(data);
      this.marker2=leaflet.marker([data.request_lat,data.request_long], {icon: yellowIcon});

      // markerGroup.addLayer(this.marker2);
      //   this.map.addLayer(this.marker2);
      // this.markerGroup.addLayer(this.marker2);
    } else if(data.request_status_id==2){
      this.marker2=leaflet.marker([data.request_lat,data.request_long], {icon: grayIcon});
      // this.markerGroup.addLayer(this.marker2);
      // markerGroup.addLayer(this.marker2);
      //   this.map.addLayer(this.marker2);
     
    }else{
      this.marker2=leaflet.marker([data.request_lat,data.request_long], {icon: purpleIcon}).on('click', () => {
        this.presentConfirm(data);

        // markerGroup.addLayer(this.marker2);
        // this.map.addLayer(this.marker2);
      })
      // }).bindPopup("Need help").addTo(this.map);
      

      // this.markerGroup.addLayer(this.marker2);
        // this.map.addLayer(this.marker2);

    }
    this.markerGroup.addLayer(this.marker2);
    this.map.addLayer(this.markerGroup);
  }
  
  ret:any;

  
  pushRespondToRequest(){
    this.navCtrl.push('RespondToRequestPage');
  }
  change(lat:any, long:any){
    this.map.removeLayer(this.markerGroup);

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
    leaflet.marker([lat,long], {icon: greenIcon, draggable:false}).addTo(this.map).on('click', () => {
    
      //alert('Hospital x');
      // this.presentConfirm();
    }).bindPopup("Need help")
   
  }
  rout(data){
    clearInterval(this.dataRefresher);
    var redIcon = new leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });  
    this.map.removeLayer(this.marker);
    leaflet.Routing.control({
      waypoints: [
        leaflet.latLng(data.request_lat, data.request_long),
        leaflet.latLng(this.currLat, this.currLong),
      ],routeWhileDragging:false,
    
    }).addTo(this.map)
    leaflet.marker([this.currLat,this.currLong], {icon: redIcon, draggable:false}).addTo(this.map);
    
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
    leaflet.marker([this.currLat, this.currLong], {icon: greenIcon,draggable:false,}).addTo(this.map).on('click', () => {
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
            this.change1();
            // this.navCtrl.push('RespondToRequestPage');
          }
        },
        {
          text: 'See',
          handler: () => {
            console.log('Buy clicked');
            //this.change(data.request_lat, data.request_long);
            clearInterval(this.dataRefresher);
            console.log('asdfasdf');
            this.navCtrl.setRoot('RespondToRequestPage', {
              request_id : data.request_id,
              request_status_id : data.request_status_id,
              person_to_check: data.person_to_check,
              event: data.event,
              persons_injured: data.persons_injured,
              persons_trapped: data.persons_trapped,
              other_info: data.other_info,
              special_needs: data.special_needs,
              request_lat: data.request_lat,
              request_long: data.request_long
            });
            console.log("request id: ");
            console.log(data.request_id);
            console.log(data.event);
          }
        }
      ]
    });
    alert.present();
  }


  showRequest(){
    this.http
       .get('http://172.16.30.28/eligtas/retrieve-emergencies.php')
       .subscribe((data : any) =>
       {
          console.log(data);
          this.request = data;
          if(this.requestshow == true){
            for(let i=0; i<data.length; i++){
              this.createMarker(data[i], i);
            }
            console.log("true");
          }else{
            for(let i=0; i<this.requestMarkers.length; i++){
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
      this.requestMarkers[i] = leaflet.marker([data.request_lat,data.request_long], {icon: purpleIcon}).bindTooltip(data.name, 
      {
          permanent: true, 
          direction: 'bottom'
      }
  ).addTo(this.map);
    }else if(data.type=="Fire Station"){
      this.requestMarkers[i] = leaflet.marker([data.request_lat,data.request_long], {icon: yellowIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
    ).addTo(this.map);
    }else if(data.type=="Police Station"){
      this.requestMarkers[i] = leaflet.marker([data.request_lat,data.request_long], {icon: grayIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
    ).addTo(this.map);
    }else{
      this.requestMarkers[i] = leaflet.marker([data.request_lat,data.request_long], {icon: blackIcon}).bindTooltip(data.name, 
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
    this.map.removeLayer(this.requestMarkers[i]);
  }
  /******** END UNSHOW MARKERS **********/
  
}

