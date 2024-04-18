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
  constructor(private activatedroute:ActivatedRoute,  private router:Router, private toastr: ToastrService, private formBuilder:FormBuilder) {
    this.formulaire=this.formBuilder.group({
      nom: ['', Validators.required],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      categorie: ['', Validators.required],
      matricule: ['', Validators.required],
      images: [null, Validators.required],
      visite: this.formBuilder.group({
        date_fin_visite: [new Date(), Validators.required] // Utilisation de formatDate ici
      }),
      assurance: this.formBuilder.group({
        date_fin: [new Date(), Validators.required] // Utilisation de formatDate ici
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
}
