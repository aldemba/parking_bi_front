import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private tokserv:TokenService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token= this.tokserv.getTokenFromStorage();

    if(token !== null) {
      let clone = request.clone(
        { headers: request.headers.set('Authorization', 'Bearer '+token)}
       )
       return next.handle(clone).pipe( 
         catchError( error => {            
             if(error.status == 401)
                 this.tokserv.clearTokenAndId();
             
             return throwError(() => ("Session expirée !"))
         })
       );
    }


    return next.handle(request);

  }
}

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptorService,
  multi: true
}
