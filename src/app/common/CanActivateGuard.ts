import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CanActivateGuard {
    constructor(private msalService: MsalService,
        private router: Router,
        private msalBroadcastService: MsalBroadcastService) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.msalBroadcastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None),
                switchMap(() => {
                    if (this.msalService.instance.getAllAccounts().length > 0) {
                        return of(true);
                    }

                    this.router.navigate( ['/home'] );
                    return of(false);
                }),
            );
        }
}