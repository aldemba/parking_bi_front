import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Parking } from 'src/app/shared/models/parking';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

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

  constructor(private route:ActivatedRoute,private proprioserv:UserService,private router:Router){}

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

}
