import { Component } from '@angular/core';
import { Credentials } from 'src/app/shared/models/credentials';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {


  public errorMessage = ""



  constructor(private authserv:AuthService){}


  ngOnInit(){

  }


  form:Credentials={
    username:'',
    password:''
  }

  onSubmit(){
    this.authserv.login(this.form).catch((err)=>(this.errorMessage=err))
  }


}
