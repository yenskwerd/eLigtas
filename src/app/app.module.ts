import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { IonTextAvatar } from 'ionic-text-avatar';
import { HistoryPage } from '../pages/history/history';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IonTextAvatar,
    HistoryPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServiceProvider,
    HTTP
  ]
})
export class AppModule {}
