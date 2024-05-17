import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

export const roleGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);  

  const authserv=inject(AuthService);
  const rolebis:User|undefined= authserv.user;

  if (rolebis?.roles) {
    
    const isAuthorized =  (!! authserv.user) ? rolebis.roles.includes(route.data['role'] as never) : false;

    if(!isAuthorized)
      router.navigate(["/superadmin/accueil"])
    
    return isAuthorized
  }

  return false;
}




