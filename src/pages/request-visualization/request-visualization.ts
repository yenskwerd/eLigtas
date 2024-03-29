import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';  
import {Http, Headers, RequestOptions}  from '@angular/http';
import leaflet, { Draggable, marker, LatLng, control } from 'leaflet';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import 'leaflet-routing-machine';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { analyzeAndValidateNgModules, flatten } from '@angular/compiler';
import { getOrCreateNodeInjectorForNode } from '@angular/core/src/render3/di';
import { r } from '@angular/core/src/render3';
import { GESTURE_PRIORITY_MENU_SWIPE } from 'ionic-angular/umd/gestures/gesture-controller';
import { map } from 'rxjs/operator/map';
// import { on } from 'cluster';


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

  
  HCFshow: any = true;
  HCFcolor: any = "assets/imgs/user/hcfi.png";
  emergencycolor: any = "assets/imgs/user/emergency.png";
  emergencyshow: any = true;

  stat_id: any;
  requestMarkers: any;
  map:any;
  route:any;
  route1:null;
  circle:any;
  circle2:any;
  currLat:any;
  currLong:any;
  control:any;
  // marker: any;
  marker: any;
  marker2: any;
  marker3: any;
  request: any;
  index: any;
  user_request_id: any;
  dataRefresher: any;
  watchrefresher: any;
  LatLng1:any;
  markerGroup = leaflet.featureGroup();
  markerGroup2 = leaflet.featureGroup();
  public status : any=false;
  public arrive : any=false;
  markerGroup3 = leaflet.featureGroup();

  mapctr: any = 0;

  trytry: any;
  trylat: any;
  trylong: any;

  purpleIcon: any;
  yellowIcon: any;
  grayIcon: any;
  blackIcon: any;
  redIcon: any;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public http : HttpClient, public http2 : Http, public navParams: NavParams, public alertCtrl : AlertController,
    public loginService: LoginServiceProvider, public platform : Platform) {
      this.requestMarkers = [];
      platform.registerBackButtonAction(() => {
        if(navCtrl.canGoBack()){
          navCtrl.pop();
        } else {
            const alert = this.alertCtrl.create({
              message: 'Are you sure you want to close the app?',
              buttons:[{
                  text: 'No',
                  role: 'cancel',
              },{
                text: 'Yes',
                handler: () => {
                  platform.exitApp();
                }
              }]
              
            })
        }
      });

    
      this.purpleIcon = new leaflet.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      this.yellowIcon = new leaflet.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });  
      this.grayIcon = new leaflet.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });  
      this.blackIcon = new leaflet.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
        shadowUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });  
      this.redIcon = new leaflet.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });  
  }

  ionViewDidLoad() {
    console.log("loaded");
    //this.getUserRequest();
  }

  ionViewWillEnter(){
    this.loadmap();
  }

  // ionViewDidEnter(){
  //   this.loadmap();
  // }
  

  ionViewDidLeave() {
    console.log("left");
    this.map.remove();
    this.navCtrl.pop();
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
 
      var latlng = leaflet.latLng(10.3574632, 123.8343172);
      //this.map = leaflet.map("map").setView(latlng, 100);
      this.map = leaflet.map("map", { zoomControl:false }).fitWorld();
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        // attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        // maxZoom: 20,
        // minZoom:16
      }).addTo(this.map);
      this.map.locate({
        //center:(this.currLat,this.currLong),
        // setView: true,
        // maxZoom: 14,
        // minZoom:16,
        // zoomOut:5,
        watch: true,
        enableHighAccuracy: true,
        maximumAge:10000,
        timeout: 20000
      })
      // .on('click', () => {
      //   this.map.locate({setView:false});
      //   console.log("NJ GWAPO");
      // })
      // this.map.locate({
      //   // setView:(this.currLat,this.currLong),
      //   setView: false,
      //   // center:this.LatLng1,
      //   maxZoom: 16,
      //   watch: true,
      //   enableHighAccuracy: true
      // })
      .on('locationfound', (e) => {
        console.log("locationfound");
        if(this.map.hasLayer(this.marker) && this.map.hasLayer(this.circle)){
          this.markerGroup2.clearLayers();
          this.map.removeLayer(this.circle);
          console.log("rmove")
        }
        this.currLat= e.latitude;
        this.currLong= e.longitude;
        this.LatLng1=leaflet.latLng(this.currLat,this.currLong);
        // this.map.locate({setView:this.LatLng1});
        this.marker=leaflet.marker([e.latitude,e.longitude], {icon: this.redIcon,draggable:false})
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
        // this.map.locate({
        //   //center:(this.currLat,this.currLong),
        //   setView: true
        // })
        // console.log(this.mapctr);
        if(this.mapctr == 1) {
          this.initView(this.currLat, this.currLong);
          this.mapctr++;
        }
        this.mapctr++;
        if(this.trylat!=null) {
          this.trytry = this.LatLng1.distanceTo(leaflet.latLng(this.trylat,this.trylong));
          console.log(this.trytry);
        }
      })
      
        .on('locationerror', (err) => {
          // alert(err.message);
      })
      this.initView(this.currLat, this.currLong);
      // this.map.locate({
      //   setView:true
      // })


      if(this.map.hasLayer(this.marker) && this.map.hasLayer(this.circle)){
        this.markerGroup2.clearLayers();
        this.map.removeLayer(this.circle);
        console.log("rmove")
      }
      this.requestMarker();
      // console.log(this.LatLng1);
      
      // if(this.map.hasLayer(this.marker) && this.map.hasLayer(this.circle)){
      //   this.markerGroup2.clearLayers();
      //   this.map.removeLayer(this.circle);
      //   console.log("rmove")
      // }
      
  }); 
  // this.watchrefresher=setInterval(() =>{
  //   this.map.locationerror({
  //     watch:false
  //   })
  //    },9000);
  // console.log("request id:" + this.loginService.logged_in_user_request_id);
  // console.log("stat id: " + this.stat_id);
}

initView(lat, long) {
  console.log(lat,long);
      this.map.locate({
        // setView:(this.currLat,this.currLong),
        setView: true,
        maxZoom: 14,
        enableHighAccuracy: true,
        stop
      })
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
    this.http.get('http://usc-dcis.com/eligtas.app/retrieve-request.php')
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

    if(data.request_status_id==null){
      this.marker2=leaflet.marker([data.request_lat,data.request_long], {icon: this.purpleIcon}).on('click', () => {
        if(this.loginService.logged_in_user_request_id == null || this.loginService.logged_in_stat_id == 3) {
          this.presentConfirm(data);
        } else {
          let alert = this.alertCtrl.create({
            message: "You cannot respond to this report.",
            buttons: ['OK']
            });
            // this.navCtrl.setRoot('HcfMappingPage');
            alert.present();
        }
      })

    } else if(data.request_status_id==1 && data.request_id == this.user_request_id){
      this.trylat = data.request_lat;
      this.trylong = data.request_long;
      console.log(this.trylat, this.trylong);
      this.rout(data);
      //this.startroute=true;
      this.eventForReport = data.event;
      this.request_id = data.request_id;
      this.marker2=leaflet.marker([data.request_lat,data.request_long], {icon: this.yellowIcon});
      // this.trytry = this.LatLng1.distanceTo(leaflet.latLng(data.request_lat,data.request_long));

    } else if( data.request_status_id==2 ){
      this.eventForReport = data.event;
      this.marker2=leaflet.marker([data.request_lat,data.request_long], {icon: this.grayIcon});
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
            this.callForBackUpMarker(res, data);
            if (this.stat_id == 0 && this.loginService.logged_in_user_request_id == data.request_id) {
              this.rout(data);
            } else if(this.stat_id == 1) {
              this.rout(data);
              this.trytry = this.LatLng1.distanceTo(leaflet.latLng(data.request_lat,data.request_long));
            } 
       }); 
    }

    var circle = leaflet.circle([data.request_lat, data.request_long], {
      color: "rgba(255,255,255,0)",
          fillColor: '#81C784',
        fillOpacity: 0,
        radius: 100
    }).addTo(this.map);
    this.map.removeLayer(this.markerGroup);
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
    // this.map.removeControl(this.control)
    clearInterval(this.dataRefresher);
    this.markerGroup2.clearLayers();

    // //mugana pero ang marker waypoint madrag niya dimusunod sa current loac

    this.map.locate({
      // setView:this.LatLng1,
      //  setView: true,
      // center:(this.currLat,this.currLong),
      // maxZoom: 14,
      // minZoom:16,
      watch: true,
      enableHighAccuracy: true,
      maximumAge:10000,
      timeout: 20000
    })
    var waypoints=[
      leaflet.latLng(data.request_lat, data.request_long),
      leaflet.latLng(this.currLat, this.currLong)
    ]
    
    this.control = leaflet.Routing.control({
      waypoints: waypoints,
       plan: leaflet.Routing.plan(waypoints, {
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
      //   createMarker: function(i, wp) {
      //     return leaflet.marker(wp.latLng, {
      //       draggable: false,
            
      //     });
      //   }
      // }),
      // waypoints: [null],
      //  routeWhileDragging:false,
      //  fitSelectedRoutes: false,
      //  showAlternatives:true,
      //  show: true,
      //  autoRoute: true,
       createMarker: function () {
        return null;
      }
    })
    })
    // .on('routingstart', showSpinner)
    // .on('routesfound routingerror', hideSpinner)
    // leaflet.Routing.errorControl(control).addTo(this.map)
  //   return r;
  // }
  // var control = getRoute();
  // var routeLayer = leaflet.layerGroup([control]);
  // this.map.addLayer(routeLayer)
    .addTo(this.map)
    
    .on('locationfound', (e) => {
      console.log("test");
      this.currLat= e.latitude;
      this.currLong= e.longitude;
      this.LatLng1=leaflet.latLng(e.latitude,e.longitude);
      console.log(this.LatLng1);
      this.marker3=leaflet.marker([e.latitude,e.longitude], {icon: this.redIcon,draggable:false})
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
    leaflet.marker([this.currLat, this.currLong], {icon: this.redIcon,draggable:false,}).addTo(this.map).on('click', () => {
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
            clearInterval(this.watchrefresher);
            // this.map.locate({
            //   watch:true
            // })
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
              request_long: data.request_long,
              
              option: "respond"
            });
            // this.requestMarker(); 
            console.log("request id: ");
            console.log(data.request_id);
            console.log(data.event);
          }
        }
      ]
    });
    alert.present();
  }

  cfbRespond(data) {
    let alert = this.alertCtrl.create({
      title: 'Response',
      message: 'Do you want to backup?',
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
              request_long: data.request_long,

              option: "CFB"
            });
            // console.log("request id: ");
            // console.log(data.request_id);
            // console.log(data.event);
          }
        }
      ]
    });
    alert.present();
  }

  showHCF(){
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
              if (data[i].status==1) {
                this.createMarker(data[i], i);
              }
            }
            console.log("true");
          }else{
            this.HCFcolor = "assets/imgs/user/hcfi.png";
            this.HCFshow = true;
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
  
  showEmergency(){
    this.map.locate({
      setView: true,
      maxZoom: 13
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
                this.requestMarkers[i] = leaflet.marker([data[i].xloc,data[i].yloc], {icon: this.grayIcon}).bindTooltip(data[i].name, 
                  {
                      permanent: true, 
                      direction: 'bottom'
                  }
                ).addTo(this.map);
              }
            }
            console.log("true");
          }else{
            this.emergencycolor = "assets/imgs/user/emergency.png";
            this.emergencyshow = true;
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
  
  recenter() {
    this.map.locate({
      setView: true,
      maxZoom: 18
    });
  }

  /********** SHOW MARKERS ************/
  createMarker(data:any, i:any){
    //in db, there is a column "hcf_type" which contains the type of emergency facility
    if(data.hcf_type == 1){
      this.requestMarkers[i] = leaflet.marker([data.xloc,data.yloc], {icon: this.purpleIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
      ).addTo(this.map);
    }else if(data.hcf_type == 3){
      this.requestMarkers[i] = leaflet.marker([data.xloc,data.yloc], {icon: this.yellowIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
    ).addTo(this.map);
    }else if(data.hcf_type == 2){
      this.requestMarkers[i] = leaflet.marker([data.xloc,data.yloc], {icon: this.grayIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
    ).addTo(this.map);
    }else{
      this.requestMarkers[i] = leaflet.marker([data.xloc,data.yloc], {icon: this.blackIcon}).bindTooltip(data.name, 
        {
            permanent: true, 
            direction: 'bottom'
        }
    ).addTo(this.map);
    }
    
  }

  public openReport(){ 
    console.log(this.eventForReport, this.user_request_id)
    var modalPage = this.modalCtrl.create('ReportPage', {
      event: this.eventForReport,
      request_id: this.user_request_id,
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
        message: "You have started navigating.",
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
    this.map.removeControl(this.control);
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
      action_datetime: new Date(),
      request_id: this.request_id
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
            this.callForBackUpMarker(res, data);
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
    
    /********** LOG **********/
    let data3 = {
      user_id: this.loginService.logged_in_user_id,
      action: "Callback",
      action_datetime: new Date(),
      request_id: this.request_id
    }
    
    this.http2.post('http://usc-dcis.com/eligtas.app/log.php', data3, options)
    
    .map(res=> res.json())
    .subscribe((data3: any) =>
    {
       console.log(data3);
    },
    (error : any) =>
    {
      console.log(error);
    });
    /********** END OF LOG **********/

    this.cfb = true;
  }

  callForBackUpMarker(data:any, data1:any){

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
      }).on('click', () => {this.cfbRespond(data1)}).addTo(this.map)
      // .on('click', () => {
      //   this.presentConfirm(data);
      // });
  }

  pushDone() {
    this.stat_id=3;
    // if(this.loginService.logged_in_user_request_id!= null){
    //   this.status = true;
    // }
    var headers = new Headers();
    
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Headers' , 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    
    let options = new RequestOptions({ headers: headers });

     
    /******** UPDATE REQUEST STATUS ID **********/
    let data2 = {
      request_id: this.request_id,
      request_status_id: 2
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
    
    /********** LOG **********/
    let data3 = {
      user_id: this.loginService.logged_in_user_id,
      action: "Rescued",
      action_datetime: new Date(),
      request_id: this.request_id
    }
    
    this.http2.post('http://usc-dcis.com/eligtas.app/log.php', data3, options)
    
    .map(res=> res.json())
    .subscribe((data3: any) =>
    {
      console.log(data3);
    },
    (error : any) =>
    {
      console.log(error);
    });
    /********** END OF LOG **********/

    
    let data4 = {
      user_id: this.loginService.logged_in_user_id,
      stat_id: 3
    }
    this.http2.post('http://usc-dcis.com/eligtas.app/update-stat.php', data4, options)
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

  pushCancel() {
    console.log("clicked cancel");
    this.user_request_id = null;
    this.stat_id=0;
    // if(this.loginService.logged_in_user_request_id!= null){
    //   this.status = true;
    // }
    var headers = new Headers();
    
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Headers' , 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    
    let options = new RequestOptions({ headers: headers });

     
    /******** UPDATE REQUEST STATUS ID **********/
    let data2 = {
      request_id: this.request_id,
      request_status_id: "NULL"
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
    
    /********** LOG **********/
    // let data3 = {
    //   user_id: this.loginService.logged_in_user_id,
    //   action: "Rescued",
    //   action_datetime: new Date(),
    //   request_id: this.request_id
    // }
    
    // this.http2.post('http://usc-dcis.com/eligtas.app/log.php', data3, options)
    
    // .map(res=> res.json())
    // .subscribe((data3: any) =>
    // {
    //   console.log(data3);
    // },
    // (error : any) =>
    // {
    //   console.log(error);
    // });
    /********** END OF LOG **********/

    
    let data4 = {
      user_id: this.loginService.logged_in_user_id,
      stat_id: 0
    }
    this.http2.post('http://usc-dcis.com/eligtas.app/update-stat.php', data4, options)
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

    let data5 = {
      user_id: this.loginService.logged_in_user_id,
      // request_id: "NULL"
    }
    this.http2.post('http://usc-dcis.com/eligtas.app/update-stat2.php', data5, options)
    .map(res=> res.json())
    .subscribe((data5: any) =>
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
    // this.removeRoutingControl();
    // if(this.map.hasLayer(this.marker) && this.map.hasLayer(this.circle)){
    //   this.markerGroup2.clearLayers();
    //   this.map.removeLayer(this.circle);
    //   console.log("rmove")
    // }
    // console.log(this.LatLng1);
    this.map.removeControl(this.control);
    this.requestMarker();
  }
  
}

