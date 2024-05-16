import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-user', 
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  formu!: FormGroup
  
  @ViewChild("optionrole") optionrole!: ElementRef

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private userserv: UserService) {
    this.formu = this.formBuilder.group({
      nom: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ ]+$/), Validators.minLength(2), Validators.maxLength(20)])),
      prenom: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ ]+$/), Validators.minLength(2), Validators.maxLength(20)])),
      telephone: new FormControl("", Validators.compose([Validators.required, Validators.pattern('[- +()0-9]{9,}')])),
      adresse: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ0-9 ]+$/), Validators.minLength(3)])),
      email: new FormControl("", Validators.compose([Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]))

    })
  }


  get fm() {
    return this.formu.controls;
  }

  showSuccess() {
    this.toastr.success('La réservation a été ajouté avec success!', 'Ajout!');
  }

  onSubmitUsers() {
    let formValues = this.formu.value;
    
    formValues = Object.assign({}, formValues, {
      '@type': this.optionrole.nativeElement.value
    }
    )
    console.log(formValues);

    this.userserv.saveUser(formValues).subscribe({
      next: (data: any) => {
        // Succès de l'appel à saveCar(), exécuter les actions suivantes
        this.formu.reset();
        this.router.navigate(["/superadmin/users"]);
        this.showSuccess();
      },
      error: (err: any) => {
        // Gérer l'erreur ici, si nécessaire
        // alert(err.error);
        let errorData;
        errorData = err
        console.log(errorData);

      }
    });
  }
}
