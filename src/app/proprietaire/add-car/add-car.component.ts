import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VoituresService } from 'src/app/shared/services/voitures.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  idParking:any;
  formulaire!:FormGroup
  file!: File;
  imageSrc=""



  constructor(private activatedroute:ActivatedRoute,  private router:Router, private toastr: ToastrService, private formBuilder:FormBuilder,private voitureserv:VoituresService) {
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


  ngOnInit() {
    let id=0;
    this.activatedroute.paramMap.subscribe(param=>{
      id=+param.get("id")!;
      this.idParking=id;
      console.log(id);
      
    })
  }

  get fm(){
    return this.formulaire.controls;
  }


  // get nom(){
  //   return this.formulaire.get("nom");
  // }

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

  showSuccess() {
    this.toastr.success('La voiture a été ajouté avec success!', 'Ajout!');
  }

  dateSupérieureValidator(control: AbstractControl): { [key: string]: any } | null {
    const dateSaisie = new Date(control.value);
    const dateActuelle = new Date();
    if (dateSaisie <= dateActuelle) {
      return { 'dateInférieure': true };
    }
    return null;
  }


  // onSubmit(){
    
  //     let formValues=this.formulaire.value

  //     formValues=Object.assign({}, formValues, {"parkings":{
  //       "id":this.idParking
  //     }})

    
      
  //     this.voitureserv.saveCar(formValues).subscribe({
  //       // next: (data:any) => { alert(data)},
  //       // error: (err:any) => { alert(err)}
  //     }); 
  //     // console.log(formValues);
  //     this.formulaire.reset();

  //     this.router.navigate(["/admin/parkings/"+this.idParking+"/voitures"]);
      
  //     this.showSuccess()
  // }

  onSubmit() {
    let formValues = this.formulaire.value;
  
    formValues = Object.assign({}, formValues, {
      "parkings": {
        "id": this.idParking
      }
    });
  
    this.voitureserv.saveCar(formValues).subscribe({
      next: (data: any) => {
        // Succès de l'appel à saveCar(), exécuter les actions suivantes
        this.formulaire.reset();
        this.router.navigate(["/admin/parkings/"+this.idParking+"/voitures"]);
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
