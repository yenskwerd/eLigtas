import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';  
import {Http, Headers, RequestOptions}  from '@angular/http';
import leaflet, { Draggable, marker, LatLng } from 'leaflet';
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

  eventForReport: any;
  request_id: any;
 
  requestshow: any;
  cfb: any = false;
  isenabled:boolean=false;
  alert: any = false ;

  HCFshow: any;
  emergencyshow: any;
  stat_id: any;
  
  requestMarkers: any;
  map:any;
  route:any;
  route1:null;
  circle:any;
  circle2:any;
  currLat:any;
  currLong:any;
  // marker: any;
  marker: any;
  marker2: any;
  marker3: any;
  request: any;
  index: any;
  user_request_id: any;
  dataRefresher: any;
  LatLng1:any;
  markerGroup = leaflet.featureGroup();
  markerGroup2 = leaflet.featureGroup();
  public status : any=false;
  public arrive : any=false;
  markerGroup3 = leaflet.featureGroup();

  trytry: any;
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public http : HttpClient, public http2 : Http, public navParams: NavParams, public alertCtrl : AlertController,
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
    this.loadmap();
  }

  ionViewDidLeave() {
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

   this.http2.post('http://usc-dcis.com/eligtas.app/retrieve-user-request.php',data,options)
   .map(res=> res.json())
     .subscribe(
       res => {
       console.log(res.request_id);
       console.log(res.stat_id);
       this.user_request_id = res.request_id;
       this.stat_id = res.stat_id;
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

   this.http2.post('http://usc-dcis.com/eligtas.app/retrieve-user-request.php',data,options)
   .map(res=> res.json())
     .subscribe(
       res => {
       console.log(res.request_id);
       this.user_request_id = res.request_id;
       console.log(res.stat_id);
       this.stat_id = res.stat_id;


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
        maxZoom: 18,
      }).addTo(this.map);
      this.map.locate({
        setView:this.LatLng1,
      //setView: true,
      //maxZoom: 120,
        watch: true,
        enableHighAccuracy: true
      })
      .on('locationfound', (e) => {
        console.log("locationfound");
        //  working pero blinking
      //   if(this.map.hasLayer(this.marker) && this.map.hasLayer(this.circle)){
      //     this.markerGroup2.clearLayers();
      //     this.map.removeLayer(this.circle);
      //     console.log("rmove")
      //   }else{
      //   this.currLat= e.latitude;
      //   this.currLong= e.longitude;
      //   this.marker=leaflet.marker([e.latitude,e.longitude], {icon: redIcon,draggable:false})
      //   .on('click', () => {
      //     alert('You are here!');
      //   }).addTo(this.map)
      //   this.circle = leaflet.circle([e.latitude, e.longitude], {
      //     color: 'rgba(255,255,255,0)',
      //         fillColor: '#81C784',
      //       fillOpacity: 0.5,
      //       radius: 100
      //   }).addTo(this.map)
      //   this.markerGroup2.addLayer(this.marker);
      //   this.markerGroup2.addLayer(this.circle);
      //   this.map.addLayer(this.markerGroup2);
      // }
      // })
        //****************** */
        if(this.map.hasLayer(this.marker) && this.map.hasLayer(this.circle)){
          this.markerGroup2.clearLayers();
          this.map.removeLayer(this.circle);
          console.log("rmove")
        }
        this.currLat= e.latitude;
        this.currLong= e.longitude;
        this.LatLng1=leaflet.latLng(this.currLat,this.currLong);
        this.marker=leaflet.marker([e.latitude,e.longitude], {icon: redIcon,draggable:false})
        .on('click', () => {
          alert('You are here!');
        }).addTo(this.map)
        this.circle = leaflet.circle([e.latitude, e.longitude], {
          color: 'rgba(255,255,255,0)',
              fillColor: '#81C784',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(this.map)
        this.markerGroup2.addLayer(this.marker);
        this.markerGroup2.addLayer(this.circle);
        this.map.addLayer(this.markerGroup2);
      })
        .on('locationerror', (err) => {
          alert(err.message);
      })
      if(this.map.hasLayer(this.marker) && this.map.hasLayer(this.circle)){
        this.markerGroup2.clearLayers();
        this.map.removeLayer(this.circle);
        console.log("rmove")
      }
      this.requestMarker();
      // if(this.map.hasLayer(this.marker) && this.map.hasLayer(this.circle)){
      //   this.markerGroup2.clearLayers();
      //   this.map.removeLayer(this.circle);
      //   console.log("rmove")
      // }
  }); 
}
removemarkercircle(){
  if(this.map.hasLayer(this.marker)){
    this.markerGroup2.clearLayers();
    this.map.removeLayer(this.circle);
  }
}
requestMarker(){
  this.dataRefresher = setInterval(() =>{
    if(this.loginService.logged_in_user_request_id!= null){
      this.status = true;
    }
    this.http
     .get('http://usc-dcis.com/eligtas.app/retrieve-request.php')
     .subscribe((data : any) =>
     {
        this.request = data;
        this.markerGroup.clearLayers();
        for(let i=0; i<data.length; i++){
          this.createMarker2(data[i]);
        }
    },
     (error : any) =>
     {
        console.dir(error);
     });
     },1000);
}
  
    
  

  createMarker2(data:any){
    // console.log("createmarker2");
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
    if(data.request_status_id==null){
      this.marker2=leaflet.marker([data.request_lat,data.request_long], {icon: purpleIcon}).on('click', () => {
        this.presentConfirm(data);
      })

    } else if(data.request_status_id==1 && data.request_id == this.user_request_id){
      this.rout(data);
      //this.startroute=true;
      this.eventForReport = data.event;
      this.request_id = data.request_id;
      this.marker2=leaflet.marker([data.request_lat,data.request_long], {icon: yellowIcon});
      this.trytry = this.LatLng1.distanceTo(leaflet.latLng(data.request_lat,data.request_long));

    } else if( data.request_status_id==2 ){
      this.marker2=leaflet.marker([data.request_lat,data.request_long], {icon: grayIcon});
    } else if (data.request_status_id == 0) {
      var headers = new Headers();
      
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Headers' , 'Content-Type');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      
      let options = new RequestOptions({ headers: headers });

      let data1 = {
        request_id: data.request_id
      }

       this.http2.post('http://usc-dcis.com/eligtas.app/retrieve-cfb-num.php',data1,options)
       .map(res=> res.json())
         .subscribe(
           res => {
            this.callForBackUpMarker(res);
       }); 
    }

    var circle = leaflet.circle([data.request_lat, data.request_long], {
      color: "rgba(255,255,255,0)",
          fillColor: '#81C784',
        fillOpacity: 0,
        radius: 100
    }).addTo(this.map);
    this.markerGroup.addLayer(this.marker2);
    this.map.addLayer(this.markerGroup);
  }
  
  ret:any;

  
  pushRespondToRequest(){
    this.navCtrl.push('RespondToRequestPage');
  }

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
    this.markerGroup2.clearLayers();

    // //mugana pero ang marker waypoint madrag niya dimusunod sa current loac

    this.map.locate({
      setView:this.LatLng1,
      //setView: true,
      //maxZoom: 120,
      watch: true,
      enableHighAccuracy: true
    })
    //console.log(this.LatLng1)
    leaflet.Routing.control({
      waypoints: [
        leaflet.latLng(data.request_lat, data.request_long),
        leaflet.latLng(this.currLat, this.currLong),
      ],
       routeWhileDragging:false,
       showAlternatives:true,
    })
    .addTo(this.map)
    
    .on('locationfound', (e) => {
      this.currLat= e.latitude;
      this.currLong= e.longitude;
      this.LatLng1=leaflet.latLng(e.latitude,e.longitude);
      console.log(this.LatLng1);
      this.marker3=leaflet.marker([e.latitude,e.longitude], {icon: redIcon,draggable:false})
      //leaflet.marker([e.latitude,e.longitude], {icon: redIcon,draggable:false})
      this.circle2 = leaflet.circle([e.latitude, e.longitude], {
        color: 'Green',
            fillColor: '#81C784',
          fillOpacity: 0.5,
          radius: 100
      })
      .on('click', () => {
      alert('You are here!');
      //console.log(this.marker3.latLng.latitude);
    })
    // leaflet.Routing.control({
    //   waypoints: [
    //     leaflet.latLng(data.request_lat, data.request_long),
    //     leaflet.latLng(this.currLat, this.currLong),
    //   ],
    //    routeWhileDragging:false,
    //    showAlternatives:true,
    // })
      .addTo(this.map);
    // .addTo(this.map);
      this.addRoutingControl({
        watch: true,
      enableHighAccuracy: true,
        waypoints: [
          leaflet.latLng(data.request_lat, data.request_long,),
          leaflet.latLng(this.currLat, this.currLong),
        ],
        routeWhileDragging:false
      })
     // .addTo(this.map);
      this.markerGroup3.addLayer(this.marker3);
      this.map.addLayer(this.markerGroup3);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
    this.removeRoutingControl();
    //************** */


    //di mugana ang orutes

    // this.map.locate({
    //   setView: true,
    //   maxZoom: 120,
    //   watch: true,
    //   enableHighAccuracy: true
    // })

    // .on('locationfound', (e) => {
    //   console.log("locationfound");
    
    //   this.addRoutingControl({
    //     waypoints: [
    //       leaflet.latLng(data.request_lat, data.request_long),
    //       leaflet.latLng(this.currLat, this.currLong),
    //     ]
    //   })
    //   // .addTo(this.map)
    //   if(this.map.hasLayer(this.marker3) && this.map.hasLayer(this.circle2)){
    //     this.markerGroup3.clearLayers();
    //     this.map.removeLayer(this.circle2);
    //     // this.map.removeLayer(this.route);
    //     this.removeRoutingControl();
    //     console.log(this.route)
    //   }
      
    //   this.currLat= e.latitude;
    //   this.currLong= e.longitude;
    //   this.marker3=leaflet.marker([e.latitude,e.longitude], {icon: redIcon,draggable:false})
    //   .on('click', () => {
    //     alert('You are here!');
    //   }).addTo(this.map)
    //   this.circle2 = leaflet.circle([e.latitude, e.longitude], {
    //     color: 'rgba(255,255,255,0)',
    //         fillColor: '#81C784',
    //       fillOpacity: 0.5,
    //       radius: 100
    //   }).addTo(this.map)
    //   this.markerGroup3.addLayer(this.marker3);
    //   this.markerGroup3.addLayer(this.circle2);
    //   this.addRoutingControl({
    //     waypoints: [
    //       leaflet.latLng(data.request_lat, data.request_long),
    //       leaflet.latLng(this.currLat, this.currLong),
    //     ]
    //   })
    //   //this.markerGroup3.addLayer(this.route);
    //   this.map.addLayer(this.markerGroup3);
    // })
    //   .on('locationerror', (err) => {
    //     alert(err.message);
    // })
    // if(this.map.hasLayer(this.marker3) && this.map.hasLayer(this.circle2)){
    //   this.markerGroup3.clearLayers();
    //   this.map.removeLayer(this.circle2);
    //   // this.map.removeLayer(this.route);
    //   // this.removeRoutingControl();
    //   console.log("rmove")
    // }
  }

  change1(){
    var redIcon = new leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }); 
    leaflet.marker([this.currLat, this.currLong], {icon: redIcon,draggable:false,}).addTo(this.map).on('click', () => {
      alert('You are here');
      // this.presentConfirm();
    });
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
       .get('http://usc-dcis.com/eligtas.app/retrieve-hcf.php')
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

    //in db, there is a column "hcf_type" which contains the type of emergency facility
    if(data.hcf_type == 1){
      this.requestMarkers[i] = leaflet.marker([data.xloc,data.yloc], {icon: purpleIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
      ).addTo(this.map);
    }else if(data.hcf_type == 3){
      this.requestMarkers[i] = leaflet.marker([data.xloc,data.yloc], {icon: yellowIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
    ).addTo(this.map);
    }else if(data.hcf_type == 2){
      this.requestMarkers[i] = leaflet.marker([data.xloc,data.yloc], {icon: grayIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
    ).addTo(this.map);
    }else{
      this.requestMarkers[i] = leaflet.marker([data.xloc,data.yloc], {icon: blackIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
    ).addTo(this.map);
    }
    
  }

  public openReport(){ 
    var modalPage = this.modalCtrl.create('ReportPage', {
      event: this.eventForReport,
      request_id: this.request_id
    });
    modalPage.present(); 
  }

  // pushReport() {
  //   this.navCtrl.push('ReportPage', {
  //     event: this.eventForReport,
  //     request_id: this.request_id
  //   });
  // }

  start(data:any){
    
    // if(this.startroute==true){
    //   this.rout(data);
    // }else{
    //   let alert = this.alertCtrl.create({
    //     message: "You didnt respond!",
    //     buttons: ['OK']
    //     });
    //     // this.navCtrl.setRoot('HcfMappingPage');
    //     alert.present();
    // }

    this.stat_id = 1;

    var headers = new Headers();
      
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Headers' , 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    
    let options = new RequestOptions({ headers: headers });

    let data1 = {
      /********** LOG **********/
      user_id: this.loginService.logged_in_user_id,
      action: "Started Navigating",
      action_datetime: new Date()
    }
    
    console.log(data1);
    this.http2.post('http://usc-dcis.com/eligtas.app/log.php', data1, options)
    
    .map(res=> res.json())
    .subscribe((data1: any) =>
    {
       // If the request was successful notify the user
       console.log(data1);
       let alert = this.alertCtrl.create({
        message: "You have started navigating(???)",
        buttons: ['OK']
        });
        // this.navCtrl.setRoot('HcfMappingPage');
        alert.present();
        //this.navCtrl.setRoot('PilgrimProfilePage'); 
        //this.log();


    },
    (error : any) =>
    {
      console.log(error);
      let alert2 = this.alertCtrl.create({
        title:"FAILED",
        subTitle: "Something went wrong!",
        buttons: ['OK']
        });

      alert2.present();
    });
    
    let data2 = {
      user_id: this.loginService.logged_in_user_id,
      stat_id: 1
    }
    this.http2.post('http://usc-dcis.com/eligtas.app/update-stat.php', data2, options)
    .map(res=> res.json())
    .subscribe((data2: any) =>
    {
       // If the request was successful notify the user
      //  console.log(data2);
      //  let alert = this.alertCtrl.create({
      //   message: "You have started navigating(???)",
      //   buttons: ['OK']
      //   });
      //   alert.present();
    },
    (error : any) =>
    {
      console.log(error);
      let alert2 = this.alertCtrl.create({
        title:"FAILED",
        subTitle: "Something went wrong!",
        buttons: ['OK']
        });

      alert2.present();
    });
  }

  pushArrive() {
    this.stat_id=2;


    var headers = new Headers();
      
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Headers' , 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    
    let options = new RequestOptions({ headers: headers });

    let data = {
      /********** LOG **********/
      user_id: this.loginService.logged_in_user_id,
      action: "Arrived",
      action_datetime: new Date()
    }
    
    console.log(data);
    this.http2.post('http://usc-dcis.com/eligtas.app/log.php', data, options)
    
    .map(res=> res.json())
    .subscribe((data: any) =>
    {
       // If the request was successful notify the user
       console.log(data);
       let alert = this.alertCtrl.create({
        message: "You have arrived!",
        buttons: ['OK']
        });
        // this.navCtrl.setRoot('HcfMappingPage');
        alert.present();
        //this.navCtrl.setRoot('PilgrimProfilePage'); 
        //this.log();


    },
    (error : any) =>
    {
      console.log(error);
      let alert2 = this.alertCtrl.create({
        title:"FAILED",
        subTitle: "Something went wrong!",
        buttons: ['OK']
        });

      alert2.present();
    });


    let data2 = {
      user_id: this.loginService.logged_in_user_id,
      stat_id: 2
    }
    this.http2.post('http://usc-dcis.com/eligtas.app/update-stat.php', data2, options)
    .map(res=> res.json())
    .subscribe((data2: any) =>
    {
       // If the request was successful notify the user
      //  console.log(data2);
      //  let alert = this.alertCtrl.create({
      //   message: "You have started navigating(???)",
      //   buttons: ['OK']
      //   });
      //   alert.present();
    },
    (error : any) =>
    {
      console.log(error);
      let alert2 = this.alertCtrl.create({
        title:"FAILED",
        subTitle: "Something went wrong!",
        buttons: ['OK']
        });

      alert2.present();
    });
  }
  /******** END SHOW MARKERS **********/

  /********** UNSHOW MARKERS ************/
  deleteMarker(i:any){
    this.map.removeLayer(this.requestMarkers[i]);
  }
  /******** END UNSHOW MARKERS **********/
  
  requestCallForBackUp(){
    //this.dataRefresher = setInterval(() =>{
      if(this.loginService.logged_in_user_request_id!= null){
        this.status = true;
      }
      var headers = new Headers();
      
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Headers' , 'Content-Type');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      
      let options = new RequestOptions({ headers: headers });

      let data = {
        request_id: this.request_id
      }

       this.http2.post('http://usc-dcis.com/eligtas.app/retrieve-cfb-num.php',data,options)
       .map(res=> res.json())
         .subscribe(
           res => {
            this.callForBackUpMarker(res);
            console.log(res);
       }); 
       
    /******** UPDATE REQUEST STATUS ID **********/
    let data2 = {
      request_id: this.request_id,
      request_status_id: 0
    }

    this.http2.post('http://usc-dcis.com/eligtas.app/update-request.php', data2, options)
    .map(res=> res.json())
    .subscribe((data2: any) =>
    {
      console.log(data2);
       // If the request was successful notify the user
      //  console.log(data2);
      //  let alert = this.alertCtrl.create({
      //   message: "You have started navigating(???)",
      //   buttons: ['OK']
      //   });
      //   alert.present();
    },
    (error : any) =>
    {
      console.log(error);
      let alert2 = this.alertCtrl.create({
        title:"FAILED",
        subTitle: "Request not updated. huhu!",
        buttons: ['OK']
        });

      alert2.present();
    });
    
    this.cfb = true;
  }

  callForBackUpMarker(data:any){
    var numberOfResponders = data.count;

    var numIcon = new leaflet.DivIcon({
      className: "number-icon",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [3, -40],
      html: numberOfResponders     
    });  
    leaflet.marker([data.request_lat,data.request_long],
      {
          icon: numIcon
      }).addTo(this.map)
      // .on('click', () => {
      //   this.presentConfirm(data);
      // });
  }

}

