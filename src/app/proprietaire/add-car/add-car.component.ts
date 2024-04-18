import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  idParking:any;
  formulaire!:FormGroup
  file!: File;



  constructor(private activatedroute:ActivatedRoute,  private router:Router, private toastr: ToastrService, private formBuilder:FormBuilder) {
    this.formulaire=this.formBuilder.group({
      nom: ['', Validators.required],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      categorie: ['', Validators.required],
      matricule: ['', Validators.required],
      images: ['null', Validators.required],
      visite: this.formBuilder.group({
        date_fin_visite: ['', Validators.required] // Utilisation de formatDate ici
      }),
      assurance: this.formBuilder.group({
        date_fin: ['', Validators.required] // Utilisation de formatDate ici
      }),




    })
   }

  //   transformDateFormat(date: Date): string {
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear().toString();
  //   return `${day}-${month}-${year}`;
  // }

  ngOnInit() {
    let id=0;
    this.activatedroute.paramMap.subscribe(param=>{
      id=+param.get("id")!;
      this.idParking=id;
      console.log(id);
      
    })
  }

  // onChange(event: any) {
  //   this.file = event.target.files[0];
  // }

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formulaire.patchValue({
          images: file
      });
    }
  }


  onSubmit(){
    
      let formValues=this.formulaire.value

      formValues=Object.assign({}, formValues, {"parkings":{
        "id":this.idParking
        // "test":this.idParking
      }})


      // const date_fin_visite:string=this.formulaire.get("visite.date_fin_visite")?.value
      // const date_fin_assurance:string=this.formulaire.get("assurance.date_fin")?.value

      // const formData = new FormData();
      // formData.append('nom',this.formulaire.get("nom")?.value)
      // formData.append('modele',formValues.modele)
      // formData.append('marque',formValues.marque)
      // formData.append('categorie',formValues.categorie)
      // formData.append('matricule',formValues.matricule)
      // formData.append('visite',date_fin_visite)
      // formData.append('assurance',date_fin_assurance)
      // formData.append('images', this.formulaire.get("images")?.value);
      // console.log(formData);

      console.log(formValues);
      
      





    
  }
















}
