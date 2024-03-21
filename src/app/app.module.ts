import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MsalGuard, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMsalInterceptor } from './common/CustomMsalInterceptor';
import { GraphComponent } from './graph/graph.component';
import { HomePageModule } from './home/home.module';
import { ProfileComponent } from './profile/profile.component';
import { CustomHttpInterceptor } from './common/CustomHttpInterceptor';
import { SaludoComponent } from './saludo/saludo.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent, GraphComponent, SaludoComponent
  ],
  imports: [
    BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,

    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.authClientID, // Application (client) ID from the app registration
          authority:
            environment.authTenantID, // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
          redirectUri: environment.authRedirectUri, // This is your redirect URI
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
        },
      }),
      {
        interactionType: InteractionType.Redirect, // MSAL Guard Configuration
        authRequest: {
          scopes: ["user.read"],
        },
      },
      {
        interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
        protectedResourceMap: new Map([
          [environment.baseUrlGraph, [environment.TOKEN_SCOPE_GRAPH]],
          [environment.baseUrlSaludo, [environment.TOKEN_SCOPE_API]],
        ]),
      }
    ),

  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HomePageModule,
    InAppBrowser,

    //Providers http, se ejecutan en orden
    { provide: HTTP_INTERCEPTORS, useClass: CustomMsalInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    
    MsalGuard
  ],
  bootstrap: [
    AppComponent,
    MsalRedirectComponent
  ],
})
export class AppModule {}
