import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent {

  formulaire!:FormGroup
  idr:number=0
  reservation:any

  
  @ViewChild('input') elementRef!: ElementRef;


  constructor(private formBuilder :FormBuilder,private toastr:ToastrService,private locationserv:LocationService,private route:ActivatedRoute,private router:Router){

  }

  ngOnInit(){
    
    let locationId=0;
    this.route.paramMap.subscribe(param=>{
      locationId=+param.get("idr")!;
      this.idr=locationId
      
    })

    // console.log("car",carId);
    if(locationId){
      this.locationserv.getReservationById(+locationId).pipe(
        switchMap((data)=>{
          this.reservation=data
          if(this.reservation){
            this.formulaire.patchValue({
              date_debut_reservation:this.reservation.date_debut_reservation,
              date_fin_reservation:this.reservation.date_fin_reservation,
            })
          }
          return []
        })
      ).subscribe()
    }
    this.formulaire=this.formBuilder.group({
      // date_debut_reservation: new FormControl('', Validators.compose([Validators.required, this.LessThanToday])),    
      date_fin_reservation: new FormControl('', Validators.compose([Validators.required, this.LessThanToday]))
    
    },{validators:this.LessThanTo.bind(this)})

    // this.formulaire.get('date_debut_reservation')?.disable()
    
    // this.elementRef.nativeElement.setAttribute('readonly', true);
  }

  onEdit() {
    let formValues = this.formulaire.value;
  
    // console.log('m10',formValues);

    this.locationserv.editLocation(formValues,+this.idr).subscribe({
      next: (data: any) => {
        console.log(data);
        
        // Succès de l'appel à saveCar(), exécuter les actions suivantes
        this.formulaire.reset();
        this.router.navigate(["/admin/parkings/reservations"]);
        this.showSuccess();
      },
      error: (err: any) => {
    
        // Vous pouvez également afficher un message d'erreur ici si vous le souhaitez
      }
    });
  }

  showSuccess() {
    this.toastr.success('La date a été rallongée avec success!', 'Edition!');
  }


  LessThanToday(control: FormControl): ValidationErrors | null {
    let today : Date = new Date();

    if (new Date(control.value) < today)
        return { "LessThanToday": true };

    return null;
}

LessThanTo(controls: FormGroup): ValidationErrors | null {
  var startDate = new Date(controls.get('date_debut_reservation')?.value);
  var endDate=new Date(controls.get('date_fin_reservation')?.value);
  if (startDate && endDate) {
  
    // Validation logique
    if (startDate > endDate) {
      return { 'LessThanTo': true }; // Retourner un objet avec la clé 'invalidDateRange' si la validation échoue
    }
  
  }
     return null;
}

get fm(){
  // console.log(this.formulaire);
  
  return this.formulaire.controls;
}

goBack() {
  this.router.navigate(["/admin/parkings/reservations"]);
}


}