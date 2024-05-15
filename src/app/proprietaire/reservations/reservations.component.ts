import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Voiture } from 'src/app/shared/models/voiture';
import { DisponibiliteService } from 'src/app/shared/services/disponibilite.service';
import { LocationService } from 'src/app/shared/services/location.service';
import { VoituresService } from 'src/app/shared/services/voitures.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {
  parkingId: number=0
  idv:number=0
  visible:boolean=false;
  voiture:Voiture|undefined
  formulaire!:FormGroup
  file!:File
  imageSrc=""
  boutonVisible = true;
  loading: boolean = true; 
  message:string=""




  constructor(private route:ActivatedRoute,private voitureServ : VoituresService,private formBuilder:FormBuilder, private locationserv:LocationService,private router:Router,private toast:ToastrService, private disponibiliteService: DisponibiliteService) {
    this.formulaire=this.formBuilder.group({

      nom_complet: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ ]+$/)])),
      adresse: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ0-9 ]+$/),Validators.minLength(3)])),
      telephone: new FormControl("", Validators.compose([Validators.required, Validators.pattern('[- +()0-9]{9,}')])),
      date_debut_reservation:new FormControl('', Validators.compose([Validators.required, this.LessThanToday])),
      date_fin_reservation:new FormControl('', Validators.compose([Validators.required, this.LessThanTodayToom])),
      images: ['']
    },{validators:this.LessThanTo.bind(this)})
   }



  ngOnInit(){
    let carId=0;
    this.route.paramMap.subscribe(param=>{
      carId=+param.get("idv")!;
      this.idv=carId
    })
    let id=0;
    this.route.paramMap.subscribe(param=>{
      id=+param.get("id")!;
      this.parkingId=id;
      // console.log(this.parkingId);

      if (carId) {
        this.voitureServ.getVoitureById(+carId).subscribe(data=>{
          this.voiture=data;
          this.loading=false
          // console.log(this.voiture);
          
        },(error:any)=>{
          this.loading=false
        })
      }
      
    })

    this.disponibiliteService.disponibilite$.subscribe(disponibilite=>{
      this.boutonVisible=disponibilite==="DISPONIBLE";
    })
  }

  LessThanTodayToom(control: FormControl): ValidationErrors | null {
    let today : Date = new Date();

    if (new Date(control.value) < today)
        return { "LessThanToday": true };

    return null;
}

LessThanToday(control: FormControl): ValidationErrors | null {
  let today: Date = new Date();
  today.setHours(0, 0, 0, 0); // Réinitialiser l'heure de la date actuelle à minuit pour comparer uniquement les dates
  
  let selectedDate = new Date(control.value);
  selectedDate.setHours(0, 0, 0, 0); // Réinitialiser l'heure de la date sélectionnée à minuit
  
  if (selectedDate < today)
      return { "LessThanToday": true };

  return null;
}



// fonction pour controler la date de sorite et d'entrée d'une réservation
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

afficherMessageErreur() {
  if (this.formulaire.errors?.['LessThanTo']) {
    return 'La date de début doit être antérieure à la date de fin.';
  }
  return '';
}


get fm(){
    // console.log("deux", this.formulaire.get('date_debut_reservation'), this.formulaire.get('date_fin_reservation'));
    // console.log(this.formulaire.errors?.['LessThanTo']);
    
    
  return this.formulaire.controls;
}

goBack(){
  this.router.navigate(["/admin/parkings/"+this.parkingId+"/voitures"]);
  // this.router.navigate(["/admin/parkings/"+this.parkingId+"/voitures/add/"+this.idv]);
}


  showModal(){
    this.visible=!this.visible
  }


  public onFileChange(event:any) {
    
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      
      const [file] = event.target.files;
      
      reader.readAsDataURL(file); 
      
      reader.onload = () => 
      {
        this.imageSrc = reader.result as string;        

        this.formulaire.patchValue({  
          images: reader.result  
        });

      };
    }
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
    
  }

  showSuccess() {
    this.toast.success('La réservation a été ajouté avec success!', 'Ajout!');
  }

  onSubmitRervation() {
    if(this.file){

      let formValues = this.formulaire.value;
      console.log(formValues);
      formValues = Object.assign({}, formValues, {
        "voiture": {
          "id": this.voiture?.id
        }
      });
    
      this.locationserv.saveLocation(formValues).subscribe({
        next: (data: any) => {
          // Succès de l'appel à saveCar(), exécuter les actions suivantes
          this.formulaire.reset();
          // this.router.navigate(["/admin/parkings/reservations"]);
          this.router.navigate(["/admin/parkings/"+this.parkingId+"/voitures"]);
          this.showSuccess();
        },
        error: (err: any) => {
          // Gérer l'erreur ici, si nécessaire
        // alert(err.error);
         let errorData;
         errorData=err
        console.log(errorData);
        // if (err.status === 422 && err.error.violations) {
        //   const validationErrors = err.error.violations.map((violation: any) => violation.message);
        //   console.log(validationErrors);
        // }
        
          // Vous pouvez également afficher un message d'erreur ici si vous le souhaitez
        }
      });
    }else{
      this.message="a"
    }
 

    }
  }

  
