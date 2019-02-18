import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';

/**
 * Generated class for the ChangePinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-pin',
  templateUrl: 'change-pin.html',
})
export class ChangePinPage {
  map:any;
  lat: any;
  lat11: any;
  lat22: any;
  long: any;
  public lat1: any;
  public long1: any;
  currLat:any;
  currLong:any;
  public marker: any;
  request: any;
  markerGroup = leaflet.featureGroup();
  markerGroup2 = leaflet.featureGroup();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lat = navParams.data.lat;
    this.long = navParams.data.long;
    this.request = navParams.data.request;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePinPage');
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
    this.map.remove();
  }

  loadmap(){
    var redIcon = new leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [0, 0],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
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
        // this.currLat= e.latitude;
        // this.currLong= e.longitude;
        //  let markerGroup2 = leaflet.featureGroup();
        //this.marker= leaflet.marker([e.latitude, e.longitude],{draggable:false})
        this.marker=leaflet.marker([this.lat,this.long], {icon: redIcon, draggable: true})
         
        // this.marker=leaflet.marker([e.latitude, e.longitude], {icon: redIcon, draggable: true})
        .on('click', () => {
          alert('Pinned Location');
        }).on('dragend', event => {
          let marker = event.target;  // you could also simply access the marker through the closure
          let result = marker.getLatLng();  // but using the passed event is cleaner
          this.lat1 = result.lat;
          this.long1 = result.lng;
          // console.log(result);
          console.log(this.lat1, this.long1)

        });
        this.markerGroup2.addLayer(this.marker);
        this.map.addLayer(this.marker);
        }).on('locationerror', (err) => {
          alert(err.message);
      })
  }

  pushPinLocation(){
    
    console.log(this.map.getCenter.lat());
    console.log(this.map.getCenter.long());
    this.navCtrl.setRoot(this.request, {
      lat: this.map.getCenter().lat,
      long: this.map.getCenter().lng
    });
  }
}
