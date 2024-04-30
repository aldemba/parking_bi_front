import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DetailsService } from '../services/details.service';
import { EMPTY, catchError, map } from 'rxjs';

export const secureGuard: CanActivateFn = (route, state) => {
  
  const carserv=inject(DetailsService)
  const router=inject(Router)


  const parkId = +route.params['id']; // ID du parking depuis l'URL

     return carserv.getVoituresByParking(parkId).pipe(
      map(voitures => {
        const firstCar = voitures[0]; // On prend la première voiture du parking (vous pouvez adapter selon vos besoins)
        if (firstCar.id == parkId) {
          // Si une voiture est trouvée dans le parking, on renvoie son ID
          return true;
        } else {
          // Si aucune voiture n'est trouvée, renvoyer false
          return false;
        }
      }),

    );
};
