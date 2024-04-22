import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { VoituresService } from 'src/app/shared/services/voitures.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent {

  formulaire!:FormGroup

  voiture:any
  parkingId: number=0
  imageSrc=""
  idv:number=0

  constructor(private formBuilder :FormBuilder,private voitureServ : VoituresService, private route:ActivatedRoute,private router:Router, private toastr: ToastrService){}


  ngOnInit(){
    // const carId=this.route.snapshot.paramMap.get('idv')
    let carId=0;
    this.route.paramMap.subscribe(param=>{
      carId=+param.get("idv")!;
      this.idv=carId
    })
    let id=0;
    this.route.paramMap.subscribe(param=>{
      id=+param.get("id")!;
      this.parkingId=id;
      console.log(this.parkingId);
      
    })
    // console.log("car",carId);
    if(carId){

      this.voitureServ.getVoitureById(+carId).pipe(
        switchMap((data)=>{
          this.voiture=data
          if(this.voiture){
            const assuranceDate = this.voiture.assurance.date_fin;
            const visiteDate = this.voiture.visite.date_fin_visite;

            this.formulaire.patchValue({
              nom:this.voiture.nom,
              marque:this.voiture.marque,
              modele:this.voiture.modele,
              matricule:this.voiture.matricule,
              categorie:this.voiture.categorie,
              assurance:{
                date_fin: assuranceDate
              },
              visite:{
                date_fin_visite:visiteDate
              },
              images:this.voiture.image
            })
          }
          return []
        })
      ).subscribe()
    }
    this.formulaire=this.formBuilder.group({
      nom: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ ]+$/), Validators.minLength(2), Validators.maxLength(20)])),
      marque: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ ]+$/), Validators.minLength(2), Validators.maxLength(20)])),
      modele: ['', Validators.required],
      categorie:new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])),
      matricule: new FormControl("",Validators.compose([ Validators.required, Validators.minLength(8)])),
      images: ['', Validators.required],
      visite: this.formBuilder.group({
        date_fin_visite: ['', Validators.required] // Utilisation de formatDate ici
      }),
      assurance: this.formBuilder.group({
        date_fin: ['', Validators.required] // Utilisation de formatDate ici
      }),

    })
    

  }

  get fm(){
    return this.formulaire.controls;
  }

  public onFileChange(event:any) {
    
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      
      const [file] = event.target.files;
      
      reader.readAsDataURL(file); 
      
      reader.onload = () => 
      {
        this.imageSrc = reader.result as string;
        // console.log(this.imageSrc);
        

        this.formulaire.patchValue({  
          images: reader.result  
          
        });

      };
    }
  }

  showSuccess() {
    this.toastr.success('La voiture a été ajouté avec success!', 'Ajout!');
  }


  onEdit() {
    let formValues = this.formulaire.value;
  
    formValues = Object.assign({}, formValues, {
      "parkings": {
        "id": this.parkingId
      }
    });
  console.log(formValues);
  
    this.voitureServ.editCar(formValues,+this.idv).subscribe({
      next: (data: any) => {
        console.log(data);
        
        // Succès de l'appel à saveCar(), exécuter les actions suivantes
        this.formulaire.reset();
        this.router.navigate(["/admin/parkings/"+this.parkingId+"/voitures"]);
        this.showSuccess();
      },
      error: (err: any) => {
        // Gérer l'erreur ici, si nécessaire
       alert(err.error);
      //  let errorData;
      // console.log(errorData);
      // if (err.status === 422 && err.error.violations) {
      //   const validationErrors = err.error.violations.map((violation: any) => violation.message);
      //   console.log(validationErrors);
      // }
      
        // Vous pouvez également afficher un message d'erreur ici si vous le souhaitez
      }
    });
  }

}
