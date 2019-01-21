import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operator/map';
import 'leaflet-routing-machine';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { HttpClient } from '@angular/common/http';  
import leaflet, { Draggable, marker } from 'leaflet';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

/**
 * Generated class for the ExistingMarkersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'existing-markers',
  templateUrl: 'existing-markers.html'
})
export class ExistingMarkersComponent {
 @Input() map;
 request: any;
  text: string;
  currLat:any;
  currLong:any;
  // marker: any;
  marker: any;
  user_request_id: any;

  constructor(public navCtrl: NavController, public alertCtrl : AlertController, public http : HttpClient, public http2 : Http,
    public loginService: LoginServiceProvider) {
    console.log('Hello ExistingMarkersComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit(){

  }

  dataRefresher : any;
  retrieveRequest(){
    this.dataRefresher = setInterval(() =>{
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
    }, 5000);
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
      } else if(data.request_status_id==1 && data.request_id == this.user_request_id){
        this.rout(data);
        leaflet.marker([data.request_lat,data.request_long], {icon: yellowIcon}).addTo(this.map);
        
        // .on('click', () => {
        //   this.presentConfirm(data);
          
        // }).bindPopup("Need help").addTo(this.map);
      } else if(data.request_status_id==2){
        leaflet.marker([data.request_lat,data.request_long], {icon: grayIcon}).addTo(this.map);
      }else{
        leaflet.marker([data.request_lat,data.request_long], {icon: purpleIcon}).addTo(this.map).on('click', () => {
          this.presentConfirm(data);
        }).bindPopup("Need help").addTo(this.map);
      }
      
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
    rout(data){
    
      leaflet.Routing.control({
        waypoints: [
          leaflet.latLng(data.request_lat, data.request_long),
          leaflet.latLng(this.currLat, this.currLong)
        ],routeWhileDragging:false,
        
        
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
            text: 'See',
            handler: () => {
              console.log('Buy clicked');
              this.change();
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
    

}
