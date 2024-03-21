import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MsalInterceptor } from "@azure/msal-angular";
import { Observable } from "rxjs";

@Injectable()
export class CustomMsalInterceptor extends MsalInterceptor implements HttpInterceptor {
    override intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log('en CustomMsalInterceptor request');
        console.log(request);
        console.log(request.headers);
        
        return super.intercept(request, next);
    }
}