import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { ErrorService } from './error.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private tokserv:TokenService, private errorService: ErrorService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token= this.tokserv.getTokenFromStorage();

    if(token !== null) {
      let clone = request.clone(
        { headers: request.headers.set('Authorization', 'Bearer '+token)}
       )
       return next.handle(clone).pipe( 
         catchError( error => {            
             if(error.status == 401){
               this.tokserv.clearTokenAndId();
               Swal.fire({
                title: "Session expirée !",
                icon: "warning",
                showConfirmButton: true,
                width: '320px', // spécifiez la largeur de la fenêtre modale
                padding: '2rem' // spécifiez l'espacement intérieur de la fenêtre modale
              });
              
             }else if(error.status == 403){
                // console.log(error.error.detail)  ;
                this.errorService.setErrorMessage(error.error.detail);
                
             }
            //  else if(error.status == 500){
            //     // console.log(error);
            //     this.errorService.setErrorMessage("Ce matricule est déja pris, veuillez en choisir un autre");

                
            //  }
             
             return throwError(() => (""))
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
