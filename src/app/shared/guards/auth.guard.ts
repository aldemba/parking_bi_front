import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);  
  const tokserv=inject(TokenService);

  if(tokserv.isLogged()){
    return true;
  }else{

    router.navigate(["/security/login"]);
    return false;

  }

};
