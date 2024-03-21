import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  isLogin: boolean = false;
  accountInfo: AccountInfo = null;

  constructor(
    private authService: MsalService,
  ) { }

  ngOnInit() {
    if(this.authService.instance.getAllAccounts().length > 0) {
      console.log(this.authService.instance.getAllAccounts()[0])
      this.accountInfo = this.authService.instance.getAllAccounts()[0] as AccountInfo;
      console.log(this.accountInfo.username)
    }
  }

}
