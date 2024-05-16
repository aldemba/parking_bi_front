import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

constructor(private route:ActivatedRoute,private router:Router,private userserv:UserService,private formBuilder:FormBuilder,private toastr:ToastrService ){}

id:number=0
user:User|undefined
formulaire!:FormGroup

  ngOnInit(){
    let userId=0;
    this.route.paramMap.subscribe(param=>{
      userId=+param.get("id")!;
      this.id=userId
      
      // console.log(userId);
    })
 
    // console.log("user",userId);
    if(userId){
      this.userserv.getUserById(+userId).pipe(
        switchMap((data)=>{          
          this.user=data
          if(this.user){
            this.formulaire.patchValue({
              prenom:this.user.prenom,
              nom:this.user.nom,
              adresse:this.user.adresse,
              telephone:this.user.telephone,
              // password:this.user.password,
              email:this.user.email,
          
            })
          }
          return []
        })
      ).subscribe()
    }
    this.formulaire=this.formBuilder.group({
      nom: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ ]+$/), Validators.minLength(2), Validators.maxLength(20)])),
      prenom: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ ]+$/), Validators.minLength(2), Validators.maxLength(20)])),
      telephone: new FormControl("", Validators.compose([Validators.required, Validators.pattern('[- +()0-9]{8,}')])),
      adresse: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ0-9 ]+$/), Validators.minLength(2)])),
      email: new FormControl("", Validators.compose([Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)])),
      // password: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^([A-Za-zÀ-ÿ0-9])[A-Za-z\d@$!%*?&]{5,}$/)])),

    })  

  }

  get fm(){
    return this.formulaire.controls
  }

  showSuccess() {
    this.toastr.warning("L'utilisateur a été modifiée avec success!','Edition!");
  }

  
  onEditUser() {

    let formValues = this.formulaire.value;
    //  console.log(formValues);
  
    this.userserv.editUser(formValues,+this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        
        this.formulaire.reset();
        this.router.navigate(["/superadmin/users"]);
        this.showSuccess();
      },
      error: (err: any) => {
        
      }
    });
  }

  goBack(){
    const navigation = "/superadmin/users"
    this.router.navigateByUrl(navigation)
  }
}
