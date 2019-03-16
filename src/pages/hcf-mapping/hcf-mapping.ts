import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import leaflet, { latLng } from 'leaflet';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { HttpClient } from '@angular/common/http';  
import { LoginPage } from '../login/login';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { dateValueRange } from 'ionic-angular/umd/util/datetime-util';
import 'leaflet-routing-machine';
import { UserHomePage } from '../user-home/user-home';
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
  marker: any;
  markerGroup: any;
  // hcfshow: any;
  HCFshow: any = true;
  HCFcolor: any = "assets/imgs/user/hcfi.png";
  emergencycolor: any = "assets/imgs/user/emergency.png";
  emergencyshow: any = true;
  request: any;
  hcfMarkers: any[];
  alert: any = false;
  user_request_id: any;
  count: any;
  looking: any=false;
  trytry:any;
  minimum:any;
  LatLng1: any;
  distanceArr: any = [];
  index: any;

  passlat: any;
  passlong: any;
  passmarker: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public http : HttpClient, public navParams: NavParams, public alertCtrl : AlertController, public http2 : Http, public loginService: LoginServiceProvider) {
    this.hcfMarkers = [];
    
    // if (navParams.data.lat!=null && navParams.data.long!=null){
    //   this.passlat = navParams.data.lat;
    //   this.passlong = navParams.data.long;
    // }
  }

  showModal() {
    var modal = this.modalCtrl.create(UserHomePage, {
      lat: this.map.getCenter().lat,
      long: this.map.getCenter().lng
    });
    modal.present();
    console.log(this.map.getCenter().lat +", "+ this.map.getCenter().lng)
  }

  recenter() {
    this.map.locate({
      setView: true,
      maxZoom: 18
    });
    if(this.loginService.logged_in_user_request_id != null) {
      this.getUserRequest1();
    }
    // this.map.locate({
    //   center: [10.3540815,123.9093871],
    //   maxZoom:18
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HcfMappingPage');
    // this.getCount();
    if(this.loginService.logged_in_user_request_id != null) {
      this.getUserRequest1();
    }
  }
  
  ionViewWillEnter() {
    if(this.map != null){
      this.map.off();
      this.map.remove();
      console.log("Entered != null");
    }
    this.loadmap();
  }

  // ionViewDidEnter(){
  //   if(this.map != null){
  //     this.map.off();
  //     this.map.remove();
  //     console.log("Entered != null");
  //   }
  //   this.loadmap();
  // }
  
  ionViewDidLeave() {
    // this.map = null;
    //leaflet.map("map").fitWorld = null;
    // document.getElementById('map').outerHTML = "";
    console.log("left");

  }
  dataRefresher:any;
  check:any =0;
 
  responseAlert(){
    this.dataRefresher = setInterval(() =>{
      let alert = this.alertCtrl.create({
        title: 'Alert',
        message: 'Did anyone respond to your request?',
        buttons: [
          {
            text: 'Yes',
            role: 'cancel',
            handler: () => {
            this.check=1;
            console.log(this.check);
            this.looking = false;
            }
          },
          {
            text: 'No',
            handler: () => {
              console.log('Cancel clicked');
              // this.navCtrl.push('RespondToRequestPage'); 
            this.check=0;
            console.log(this.check);
            this.responseAlert();
            }
          }
        ]
      });
      if(this.check==0){
          clearInterval(this.dataRefresher);
          alert.present();
      } else {
          clearInterval(this.dataRefresher);
      } 
      
        },600000);
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

   this.http2.post('http://usc-dcis.com/eligtas.app/retrieve-user-request.php',data,options)
   .map(res=> res.json())
     .subscribe(
       res => {
       console.log(res.request_id);
       this.user_request_id = res.request_id;
   }); 
  }

  getUserRequest1(){
    var grayIcon = new leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }); 
    //gets user data
    var headers = new Headers();
      
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Headers' , 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    
    let options = new RequestOptions({ headers: headers });
    let data = {
      request_id: this.loginService.logged_in_user_request_id
    }
    console.log(data);

   this.http2.post('http://usc-dcis.com/eligtas.app/retrieve-user-request1.php',data,options)
   .map(res=> res.json())
     .subscribe(
       res => {
      //    console.log(res.request_lat);
      //  this.passlat = res.request_lat;
      //  this.passlong = res.request_long;
      leaflet.marker([res.request_lat,res.request_long], {icon: grayIcon}).bindTooltip(res.event, {direction: 'bottom'}).addTo(this.map);

      
      if (res.request_status_id == null) {
        this.looking = true;
        this.responseAlert();
      } else {
        this.looking = false;
      }
   }); 
   
  }

  getCount() {

    this.getUserRequest();

    var headers = new Headers();
      
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Headers' , 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    
    let options = new RequestOptions({ headers: headers });

    let data1 = {
      request_id: this.user_request_id
    }

    this.http2.post('http://usc-dcis.com/eligtas.app/retrieve-cfb-num.php',data1,options)
     .map(res=> res.json())
       .subscribe(
         res => {
          console.log(res.count);
          this.count = res.count;
          if (res.count == 0) {
            this.looking = true;
            this.responseAlert();
            console.log("0 ang value")
          } else {
            document.getElementById("looking").style.display = "none";
            console.log("dili 0 ang value")
          }
          // this.callForBackUpMarker(res);
    }); 

  }



  loadmap(){
    // document.getElementById('mapper').innerHTML = 
    //   "<div id='map' style='width:100%; height: 100%;'></div>";
      // "<div id='map' style='width: 100%; height: 100%;'>\
      //   <ion-fab top><img *ngIf='looking==true' top src='assets/imgs/user/wfr.gif' class='loading'></ion-fab>\
      //   <ion-fab left top>\
      //     <button color='trans' ion-fab menuToggle><ion-icon color='primary' name='menu'></ion-icon></button>\
      //     <button color='trans' (click)='showEmergency($event)' ion-fab><img src={{emergencycolor}} class='togglesht'></button>\
      //     <button color='trans' (click)='showHCF($event)' ion-fab><img src={{HCFcolor}} class='togglesht'></button>\
      //   </ion-fab>\
      //   <ion-fab right top>\
      //     <button color='light' class='fab-trans' (click)='recenter()' ion-fab><ion-icon name='locate'></ion-icon></button>\
      //   </ion-fab>\
      //   <ion-fab right bottom>\
      //     <button color='secondary' (click)='showModal()' ion-fab><ion-icon name='apps'></ion-icon></button>\
      //   </ion-fab>\
      // </div>";
    var circleIcon = new leaflet.Icon({
      iconUrl: 'assets/imgs/current.png',
      iconSize: [35, 35]
    });

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
    // var latlng = leaflet.latLng(10.3574632, 123.8343172);
    // this.map = leaflet.map("map").setView(latlng, 16);
    this.map = leaflet.map("map", { zoomControl:false }).fitWorld();
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 25
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 18
    }).on('locationfound', (e) => {
      if(this.map.hasLayer(this.marker)){
        this.markerGroup.clearLayers();
        this.map.removeLayer(this.marker);
        console.log("rmove")
      }
      this.markerGroup = leaflet.featureGroup();
      this.marker = leaflet.marker([e.latitude, e.longitude], {icon: circleIcon}).on('click', () => {
        console.log(this.lat,this.long);
      }).bindPopup("You are here!");
      this.markerGroup.addLayer(this.marker);
      this.map.addLayer(this.markerGroup);
      // var circle = leaflet.circle([e.latitude, e.longitude], {
      //   color: 'Green',
      //       fillColor: '#81C784',
      //     fillOpacity: 0.5,
      //     radius: 20
      // }).addTo(this.map);
      this.lat = e.latitude;
      this.long = e.longitude;
      this.LatLng1=leaflet.latLng(e.latitude,e.longitude);
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

    
    // var grayIcon = new leaflet.Icon({
    //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    //   iconSize: [25, 41],
    //   iconAnchor: [12, 41],
    //   popupAnchor: [1, -34],
    //   shadowSize: [41, 41]
    // }); 
    
    
    // if (this.passlat!=null && this.passlong!=null){
    //   leaflet.marker([this.passlat,this.passlong], {icon: grayIcon}).addTo(this.map);
    // }
  }
  // 10.3502881,123.8988732
  // 10.361011,123.9070701
  addRoutingControl = function (waypoints) { 
    if (this.route1 != null)
        this.removeRoutingControl();

    // routingControl = L.Routing.control({
    //     waypoints: waypoints
    // }).addTo(map);

  this.route1= leaflet.Routing.control({
      waypoints: waypoints
  }).addTo(this.map);
};

  removeRoutingControl = function () {
    if (this.route1 != null) {
        this.map.removeControl(this.route1);
        this.route1 = null;
    }
};

  route(data){
    var waypoints=[
      leaflet.latLng(data.xloc, data.yloc),
      leaflet.latLng(this.currLat, this.currLong)
    ]

    leaflet.Routing.control({
      waypoints: waypoints,
      plan: leaflet.Routing.plan(waypoints, {
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
        createMarker: function(i, wp,) {
          return leaflet.marker(wp.latLng, {
            draggable: false,
            
          });
        }
      }),
      // waypoints: [null],
       routeWhileDragging:false,
       fitSelectedRoutes: false,
       showAlternatives:true,
       show: true,
       autoRoute: true,
      //  createMarker: function () {
      //   return null;
      // }
    }).addTo(this.map);
    // leaflet.Routing.control({
    //   waypoints: [
    //     leaflet.latLng(data.xloc, data.yloc),
    //     leaflet.latLng(this.currLat, this.currLong)
    //   ]
    // }).addTo(this.map);
  }
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

  // showHCF(){
  //   this.http
  //      .get('http://usc-dcis.com/eligtas.app/retrieve-emergencies.php')
  //      .subscribe((data : any) =>
  //      {
  //         console.log(data);
  //         this.request = data;
  //         if(this.hcfshow == true){
  //           for(let i=0; i<data.length; i++){
  //             this.createMarker(data[i], i);
  //           }
  //           console.log("true");
  //         }else{
  //           for(let i=0; i<this.hcfMarkers.length; i++){
  //             this.deleteMarker(i);
  //           }
  //           console.log("false");
  //         }
          
  //      },
  //      (error : any) =>
  //      {
  //         console.dir(error);
  //      });  
  // }

  showHCF(){
    // this.dataRefresher = setInterval(() =>{
    this.map.locate({
      setView: true,
      maxZoom: 13
    });

    this.http
       .get('http://usc-dcis.com/eligtas.app/retrieve-hcf.php')
       .subscribe((data : any) =>
       {
          console.log(data);
          this.request = data;
          if(this.HCFshow == true){
            this.HCFcolor = "assets/imgs/user/hcfa.png";
            this.HCFshow = false;
            for(let i=0; i<data.length; i++){
              if(data[i].status==1) {
                this.createMarker(data[i], i);
                this.distanceArr.push({
                  distance: this.LatLng1.distanceTo(leaflet.latLng(data[i].xloc,data[i].yloc)),
                  xloc: data[i].xloc,
                  yloc: data[i].yloc
                });
              }
            }

            this.minimum = this.distanceArr[0].distance;
            this.index = 0;
            
            for(let i=1; i<this.distanceArr.length; i++){
              if(this.distanceArr[i].distance<this.minimum){
                this.minimum = this.distanceArr[i].distance;
                this.index = i;
              }
            }
            // this.route(this.distanceArr[this.index]);
            console.log("true");
          }else{
            this.map.locate({
              setView: true,
              maxZoom: 18
            });
            this.HCFcolor = "assets/imgs/user/hcfi.png";
            this.HCFshow = true;
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
      // },1000);
  }
  
  showEmergency(){
    this.map.locate({
      setView: true,
      maxZoom: 13
    });

    var grayIcon = new leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }); 
    
    this.http
       .get('http://usc-dcis.com/eligtas.app/retrieve-emergencies.php')
       .subscribe((data : any) =>
       {
          console.log(data);
          this.request = data;
          if(this.emergencyshow == true){
            
            this.emergencycolor = "assets/imgs/user/emergency2.png";
            this.emergencyshow = false;
            for(let i=0; i<data.length; i++){
              if(data[i].status==1) {
                this.hcfMarkers[i] = leaflet.marker([data[i].xloc,data[i].yloc], {icon: grayIcon}).bindTooltip(data[i].name, 
                  {
                      permanent: true, 
                      direction: 'bottom'
                  }
                ).addTo(this.map);
              }
            }
            console.log("true");
          }else{
            this.map.locate({
              setView: true,
              maxZoom: 18
            });
            this.emergencycolor = "assets/imgs/user/emergency.png";
            this.emergencyshow = true;
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
    if(data.hcf_type == 1){
      this.hcfMarkers[i] = leaflet.marker([data.xloc,data.yloc], {icon: purpleIcon}).bindTooltip(data.name, 
      {
          permanent: true, 
          direction: 'bottom'
      }
  ).addTo(this.map);
    }else if(data.hcf_type == 3){
      this.hcfMarkers[i] = leaflet.marker([data.xloc,data.yloc], {icon: yellowIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
    ).addTo(this.map);
    }else if(data.hcf_type == 2){
      this.hcfMarkers[i] = leaflet.marker([data.xloc,data.yloc], {icon: grayIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
    ).addTo(this.map);
    }else{
      this.hcfMarkers[i] = leaflet.marker([data.xloc,data.yloc], {icon: blackIcon}).bindTooltip(data.name, 
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
