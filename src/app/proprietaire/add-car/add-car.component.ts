import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


  ngOnInit() {
    let id=0;
    this.activatedroute.paramMap.subscribe(param=>{
      id=+param.get("id")!;
      this.idParking=id;
      console.log(id);
      
    })
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

  showSuccess() {
    this.toastr.warning('La voiture a été ajouté avec success!', 'Ajout!');
  }


  onSubmit(){
    
      let formValues=this.formulaire.value

      formValues=Object.assign({}, formValues, {"parkings":{
        "id":this.idParking
        // "test":this.idParking
      }})

    
      
      this.voitureserv.saveCar(formValues).subscribe({
        // next: (data:any) => { alert(data)},
        // error: (err:any) => { alert(err)}
      }); 
      // console.log(formValues);
      this.formulaire.reset();

      this.router.navigate(["/admin/parkings/"+this.idParking+"/voitures"]);
      
      this.showSuccess()
  }



}
