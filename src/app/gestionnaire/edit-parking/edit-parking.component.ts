import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { Parking } from 'src/app/shared/models/parking';
import { ParkingsService } from 'src/app/shared/services/parkings.service';

@Component({
  selector: 'app-edit-parking',
  templateUrl: './edit-parking.component.html',
  styleUrls: ['./edit-parking.component.css']
})
export class EditParkingComponent {

  constructor(private route: ActivatedRoute, private parkingserv: ParkingsService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) { }

  idp: number = 0
  parking: Parking | undefined
  formulaire!: FormGroup
  userId: number = 0
  // imageSrci: string | undefined = ""
  // imageSrc = ""
  file!: File

  ngOnInit() {
    let parkingId = 0;
    this.route.paramMap.subscribe(param => {
      parkingId = +param.get("idp")!;
      this.idp = parkingId
      // console.log(parkingId);
      
    })
    let id = 0;
    this.route.paramMap.subscribe(param => {
      id = +param.get("id")!;
      this.userId = id;
      // console.log(this.userId);

    })
    if (parkingId) {
      this.parkingserv.getParkingById(+parkingId).pipe(
        switchMap((data) => {
          this.parking = data
          // console.log(this.parking);
          
          if (this.parking) {

            this.formulaire.patchValue({
              nom: this.parking.nom,
              adresse: this.parking.adresse,
              // images: this.parking.image
            })
            // this.imageSrci=this.parking.image
          }
          return []
        })
      ).subscribe()
    }
    this.formulaire = this.formBuilder.group({
      nom: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ ]+$/), Validators.minLength(3), Validators.maxLength(20)])),
      adresse: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ0-9 ]+$/), Validators.minLength(2)])),
      // images: new FormControl("", Validators.required)

    })
  }

  get fm() {
    return this.formulaire.controls;
  }

  showSuccess() {
    this.toastr.warning('Le parking a été modifiée avec success!', 'Edition!');
  }


  onEditParking() {
    let formValues = this.formulaire.value;

    formValues = Object.assign({}, formValues, { 
        "id": this.userId
    });

    // console.log(formValues);

    this.parkingserv.editCar(formValues, +this.idp).subscribe({
      next: (data: any) => {
        // console.log(data);

        // Succès de l'appel à editParking(), exécuter les actions suivantes
        this.formulaire.reset();
        this.router.navigate(["/superadmin/users/" + this.userId + "/details-user"]);
        this.showSuccess();
      },
      error: (err: any) => {

      }
    });
  }

  goBack(){
    const navigation = "/superadmin/users/"+this.userId+"/details-user"
    this.router.navigateByUrl(navigation)
  }
}
