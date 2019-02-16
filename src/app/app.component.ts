import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { Events } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  username: any;

  rootPage:any = HomePage;
  mainmenus: Array<{icon:string, title: string, component: any}>;

  extrapages: Array<{icon:string, title: string, component: any}>;
  submenus: Array<{icon:string, title: string, component: any}>;
  home: Array<{icon:string, title: string, component: any}>;
 
  constructor(public platform: Platform, public statusBar: StatusBar, public events: Events, public splashScreen: SplashScreen, public loginService: LoginServiceProvider) {
    this.initializeApp();

    events.subscribe('user:sidebar', () => {
      this.username = this.loginService.logged_in_user_name;
      this.createSidebar();
    });

    
    this.submenus = [
      { icon: "medkit", title: 'Go to First Aid App', component: ""},
      { icon: 'filing', title: 'View Reports', component: ""},
      { icon: 'globe', title: 'Go to Batingaw App', component: ""},
      { icon: 'medkit', title: 'Go to Red Cross App', component: ""},
      { icon: 'locate', title: 'Go to Google Maps', component: ""},
      { icon: 'globe', title: 'Go to MIMS App', component: ""}
    ];

    // this.pages = [
    //   { icon: '', title: 'Go to First Aid App', component: ""},
    //   { icon: '', title: 'PDCAT Calculator', component: ""},
    //   { icon: '', title: 'View Reports', component: ""},
    //   { icon: '', title: 'Go to Batingaw App', component: ""},
    //   { icon: '', title: 'Go to Red Cross App', component: ""},
    //   { icon: '', title: 'Go to Google Maps', component: ""},
    //   { icon: '', title: 'Go to MIMS App', component: ""},
    //   { icon: '', title: 'Logout', component: HomePage}
    // ]; 
    
  }

  createSidebar(){
        this.mainmenus = [
          { icon: "time", title: 'History', component: ""},
          { icon: 'apps', title: 'Apps', component: ""},
          { icon: 'settings', title: 'Settings', component: ""}
        ];
        this.extrapages = [
          { icon: 'log-out', title:'Log out', component: HomePage}
        ];
  }

  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
   this.nav.setRoot(page.component);
   }

}

