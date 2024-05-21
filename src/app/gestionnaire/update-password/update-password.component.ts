import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {


  constructor(private route: ActivatedRoute, private router: Router, private userserv: UserService, private formBuilder: FormBuilder, private toastr: ToastrService, private authserv: AuthService) { }


  id: number = 0
  user: User | undefined
  formulaire!: FormGroup

  ngOnInit() {
    let userId = 0;
    this.route.paramMap.subscribe(param => {
      userId = +param.get("id")!;
      this.id = userId
    })

    // console.log("user",userId);
    if (userId) {
      this.userserv.getUserById(+userId).pipe(
        switchMap((data) => {
          this.user = data
          if (this.user) {
            this.formulaire.patchValue({
              password: this.user.password,
              confirmPassword: this.user.confirmPassword,
            })
          }
          return []
        })
      ).subscribe()
    }
    this.formulaire = this.formBuilder.group({
      password: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^([A-Za-zÀ-ÿ0-9])[A-Za-z\d@$!%*?&]{5,}$/)])),
      confirmPassword: new FormControl("", Validators.required)

    }, { validators: this.passwordMatchValidator.bind(this) })
  }


  passwordMatchValidator(controls: FormGroup): ValidationErrors | null {

    const password = controls.get('password')?.value;

    const confirmPassword = controls.get('confirmPassword')?.value;

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        return { 'passwordMatchValidator': true };
      }
    }
    return null; // No errors

  }


  afficherMessageErreur() {
    if (this.formulaire.errors?.['passwordMatchValidator']) {
      return 'Vous devez saisir le même mot de passe!';
    }
    return '';
  }
  
  showSuccess() {

    this.toastr.warning("Le mot de passe a été modifié avec success!','Edition!");

  }

  onEditUser() {

    let formValues = this.formulaire.value;

    this.userserv.editUser(formValues, +this.id).subscribe({
      next: (data: any) => {
        // console.log(data);

        this.formulaire.reset();
        (this.authserv.hasRole("ROLE_PROPRIETAIRE")) ? this.router.navigate(["/admin/parkings"]) : this.router.navigate(["/superadmin/accueil"])
        this.showSuccess();
      },
      error: (err: any) => {

      }
    });
  }


  get fm() {
    return this.formulaire.controls;
  }

}
