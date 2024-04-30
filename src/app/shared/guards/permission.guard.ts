import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { DetailsService } from '../services/details.service';
import { Observable, catchError, map, EMPTY, of } from 'rxjs';
import { ParkingsService } from '../services/parkings.service';

export const permissionGuard: CanActivateFn = (route, state) => {

  const userId:any=localStorage.getItem("id");
  const parkingId = +route.params['id'];
  const parkserv=inject(ParkingsService)
  let allParkings:any[] = [];
  const allParkingsbis=parkserv.getParkingsById(+userId).subscribe(data=>{
    allParkings=data;
  })


  for (const parking of allParkings){
      if(parking.id==parkingId){
        return true;
      }
  }


  return of(false)
}


// const activatedroute= inject(ActivatedRoute)
// // const parkserv=inject(ParkingsService)
// const carserv=inject(DetailsService)
// const router=inject(Router)


// // const parkId = +activatedroute.snapshot.params['id']; // ID du parking depuis l'URL
// const parkId = +route.params['id']; // ID du parking depuis l'URL

//   // return carserv.getVoituresByParking(parkId).pipe(
//   //   map(voitures => {
//   //     const firstCar = voitures[0]; // On prend la première voiture du parking (vous pouvez adapter selon vos besoins)
//   //     if (firstCar.id == parkId) {
//   //       // Si une voiture est trouvée dans le parking, on renvoie son ID
//   //       return true;
//   //     } else {
//   //       // Si aucune voiture n'est trouvée, renvoyer false
//   //       return false;
//   //     }
//   //   }),

//   // );
//   return carserv.getVoituresByParking(parkId).pipe(
//     map(voitures => {
//       // Vérifie si une voiture appartient au parking avec l'ID donné
//       return voitures.some((voiture:any) => voiture.parkingId === parkId);
//     }),
//     catchError(() => {
//       // Gestion des erreurs, redirigez si nécessaire
//       router.navigate(['/security/login']);
//       return EMPTY;
//     })
//   );