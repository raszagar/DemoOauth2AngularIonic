import { Injectable } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { MsalService } from '@azure/msal-angular';
import type { IPublicClientApplication } from "@azure/msal-browser";
import { NavigationClient } from "@azure/msal-browser";
import { Capacitor } from "@capacitor/core";

@Injectable({ providedIn: 'root' })
export class CustomNavigationClient extends NavigationClient {

  private msalInstance: IPublicClientApplication;

  constructor(
    private iab: InAppBrowser, 
    private authService: MsalService,
  ) {
    super();
    this.msalInstance = this.authService.instance;
  }

  override async navigateExternal(url: string, options: any) {
    // Cordova implementation
    if (Capacitor.isNativePlatform()) {
      console.log('ES PLATAFORMA NATIVA');

      var browser = this.iab.create(url, '_blank',
        {
          location: "yes",
          hidenavigationbuttons: "yes",
          clearcache: "yes",
          clearsessioncache: "yes",
          hideurlbar: "yes",
          fullscreen: "yes",
          shouldPauseOnSuspend: 'yes',
          toolbar: 'no',
          zoom: 'no',
        });

      browser.on('loadstart').subscribe(event => {
        if (event.url.includes('#code')) {
          browser.close();
          const domain = event.url.split('#')[0];
          
          const authCode = event.url.split('#code=')[1].split('&client_info')[0];

          //const url = event.url.replace(domain, 'capacitor://localhost/home');
          const url = `capacitor://localhost/home#code=${authCode}`;

          console.log('will redirect to:', url);
          //window.location.href = url;

          this.msalInstance
            .handleRedirectPromise(url)
            .then((res) => {
              console.log('res: ', res); //here res is null
              console.log('res account: ', res?.account);
              console.log(res?.account?.name + " has authenticated");

              window.location.href = url;
            })
            .catch((err) => {
              console.log('Hay error en handleRedirectPromise');
              console.log(err);
            });

        }
      });

    } else {
      console.log('NO es plataforma nativa');
      if (options.noHistory) {
        window.location.replace(url);
      } else {
        window.location.assign(url);
      }
    }
    return true;
  }
}