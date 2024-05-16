import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParkingsService } from 'src/app/shared/services/parkings.service';

@Component({
  selector: 'app-add-parking',
  templateUrl: './add-parking.component.html',
  styleUrls: ['./add-parking.component.css']
})
export class AddParkingComponent {

  formulaire!: FormGroup
  id: number = 0
  file!: File
  imageSrc: string = ''
  message: string = ""

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private toastr: ToastrService, private parkingserv: ParkingsService, private router: Router) {
    this.formulaire = this.formBuilder.group({
      nom: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ ]+$/), Validators.minLength(2), Validators.maxLength(20)])),
      adresse: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ0-9 ]+$/), Validators.minLength(2)])),
      images: new FormControl("", Validators.required)

    })
  }
  ngOnInit() {
    let userId = 0;
    this.route.paramMap.subscribe(param => {
      userId = +param.get("id")!;
      this.id = userId

      // console.log(userId);
    })

  }

  showSuccess() {
    this.toastr.success('Le parking a été ajouté avec success!', 'Ajout!');
  }

  get fm() {
    return this.formulaire.controls;
  }

  submitParking() {
    if (this.file) {
      let formValues = this.formulaire.value;

      formValues = Object.assign({}, formValues, {
        "proprietaire": {
          "id": this.id
        }
      }
      )
      console.log("m10", formValues);

      this.parkingserv.saveParking(formValues).subscribe({

        next: (data: any) => {
          console.log(data);

          // Succès de l'appel à saveParking(), exécuter les actions suivantes
          this.formulaire.reset();
          this.router.navigate(["/superadmin/users/" + this.id + "/details-user"]);
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

    } else {
      this.message = "a"
    }

  }

  public onFileChange(event: any) {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
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


  goBack(){
    const navigation = "/superadmin/users/"+this.id+"/details-user"
    this.router.navigateByUrl(navigation)
  }
  
}
