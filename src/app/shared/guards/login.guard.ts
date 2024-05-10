import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const loginGuard: CanActivateFn = (route, state) => {
  
  const router=inject(Router);  
  const tokserv=inject(TokenService);

  if(tokserv.isLogged()){
    router.navigate(["/admin/parkings"]);
    return false;
  }
  return true;

    
  


};
