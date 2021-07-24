import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("comming to interceptor");
        req  = req.clone({
              setParams: {
                key: '68bdb165cb844ff393a3bdc88f270ff0',
              }
        });
        return next.handle(req);
    }

}