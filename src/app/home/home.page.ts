import { Component } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import type { IPublicClientApplication } from "@azure/msal-browser";
import { AccountInfo, AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { CustomNavigationClient } from '../common/CustomNavigationClient';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private readonly _destroying$ = new Subject<void>();

  isLogin: boolean = false;
  accountInfo: AccountInfo = null;

  constructor(
    private authService: MsalService,
    private broadcastService: MsalBroadcastService,
    private iab: InAppBrowser,
    //private msalInstance: IPublicClientApplication
  ) {
    this.authService.instance.setNavigationClient(new CustomNavigationClient(this.iab, this.authService));

    /*
    this.authService.instance.handleRedirectPromise().then((authResult: any) => {
      console.debug('AuthResult ---->', authResult);
      if (authResult) {
        console.log('iff.....');
        
        console.log(authResult.account);
        // your login logic goes here. 
      } else {
        console.log('elsee.....');
        //this.authService.instance.loginRedirect();
      }
    }).catch((err) => {
      console.log('Hay error en handleRedirectPromise 2');
      console.log(err);

      this.authService.loginRedirect();
    });
    */
  }

  ngOnInit() {
    console.log('Estoy en Init home 2');

    this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        console.log('--> login success 0');
        this.setLoginDisplay();
      });

    this.broadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => (msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.SSO_SILENT_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS)),
      )
      .subscribe((result: EventMessage) => {
        console.log('--> login success 1: ', result);
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);

        this.setLoginDisplay();

        // custom service to handle authentication result within application
        /*this.azureAuthService.handleAuthentication(payload) 
          .pipe(
            tap(() => {
              console.log('--> login success 2: ');
              this.router.navigate(['/home']);
            })
          )
          .subscribe();*/
      });

    this.broadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => (msg.eventType === EventType.LOGIN_FAILURE)),
      )
      .subscribe((result: EventMessage) => {
        console.log('login ha fallado...');
        console.log('result', result.error);
        

      });

  }

  login() {
    console.log('Hacer login');
    this.authService.loginRedirect();
  }

  logout() {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: '/'
    });
  }

  setLoginDisplay() {
    console.log('Terminado login');
    this.isLogin = this.authService.instance.getAllAccounts().length > 0
    console.log(this.authService.instance.getAllAccounts());

    if (this.authService.instance.getAllAccounts().length > 0) {
      console.log(this.authService.instance.getAllAccounts()[0])
      this.accountInfo = this.authService.instance.getAllAccounts()[0] as AccountInfo;
      console.log(this.accountInfo.username)
    } else {
      console.log('estoy en el else');

    }

  }

  setLoginDisplay2() {
    console.log('Terminado login 2');

  }

  checkLogin() {
    console.log('checkLogin');
    console.log(this.authService.instance.getAllAccounts());

    if (this.authService.instance.getAllAccounts().length > 0) {
      console.log(this.authService.instance.getAllAccounts()[0])
      this.accountInfo = this.authService.instance.getAllAccounts()[0] as AccountInfo;
      console.log(this.accountInfo.username)
    } else {
      console.log('estoy en el else');

    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(null);
    this._destroying$.complete();
  }

}
