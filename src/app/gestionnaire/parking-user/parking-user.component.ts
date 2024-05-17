import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Parking } from 'src/app/shared/models/parking';
import { User } from 'src/app/shared/models/user';
import { ParkingsService } from 'src/app/shared/services/parkings.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parking-user',
  templateUrl: './parking-user.component.html',
  styleUrls: ['./parking-user.component.css']
})
export class ParkingUserComponent {

  id:number=0
  user:User|undefined
  parkings:any
  parkingselected!:Parking

  constructor(private route:ActivatedRoute,private proprioserv:UserService,private router:Router, private parkinserv:ParkingsService, private toastr:ToastrService){}

  ngOnInit(){
    let userId=0;
    this.route.paramMap.subscribe(param=>{
      userId=+param.get("id")!;
      this.id=userId
      // console.log(userId);
      
    })

    this.proprioserv.getProprioById(userId).subscribe(data=>{
      this.user=data
      console.log("mam",data);
      this.parkings=data.allParkings
      // console.log("1",data['parkings']);
      
      this.parkings = this.parkings.filter((park: any) => park.isVisible==1);

      console.log("m10",this.parkings);
      
    })
  }
 
  addParking(){
    const navigation = "/superadmin/users/"+this.id+"/add/parkings"
    this.router.navigateByUrl(navigation)
  }

  taille(){
    if (this.parkings && this.parkings.length >0) {
      return true
    }
    return false
  }

  goBack(){
    const navigation = "/superadmin/users"
    this.router.navigateByUrl(navigation)
  }

  redirectToEditParking(parkingId:number){
    const navigation = "superadmin/users/"+this.id+"/parking/edit/"+parkingId
    this.router.navigateByUrl(navigation)
  }
  
  afficherDetailsParking(parking: Parking) {
    this.parkingselected = parking; // Affecter les informations de la voiture sélectionnée à la variable
  }

  showSuccess() {
    this.toastr.success('Le parking a été supprimée avec succès!', 'Suppression!');
  }

  deleteParking(parking: Parking) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Voulez-vous vraiment supprimer le parking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer ce parking !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme, changer l'état de l'utilisateur
        this.parkinserv.changeVisibility(parking).subscribe({

        });
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(["/superadmin/users/"+this.id+"/details-user"]);
          this.showSuccess()
        });

      }
    });
  }

}
