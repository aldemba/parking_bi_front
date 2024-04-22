import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  imageSrc=""

  constructor(private formBuilder :FormBuilder,private voitureServ : VoituresService, private route:ActivatedRoute){}


  ngOnInit(){
    const carId:any=this.route.snapshot.paramMap.get('idv')

    // console.log("car",carId);
    if(carId){

      this.voitureServ.getVoitureById(+carId).pipe(
        switchMap((data)=>{
          this.voiture=data
          if(this.voiture){
            const assuranceDate = this.voiture.assurance.date_fin;
            const visiteDate = this.voiture.visite.date_fin_visite;

            console.log(visiteDate);
            console.log(assuranceDate);
            
            

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
      images: ['null', Validators.required],
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

        this.formulaire.patchValue({  
          images: reader.result  
        });

      };
    }
  }


  onEdit(){
    
  }

}
