import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mesusers',
  templateUrl: './mesusers.component.html',
  styleUrls: ['./mesusers.component.css']
})
export class MesusersComponent {

  users: any
  userselected!:User

  constructor(private userserv: UserService, private router: Router, private toastr: ToastrService) {

  }
  ngOnInit() {
    this.userserv.getUsers().subscribe({
      next: data => {
        this.users = data
        console.log("m10", this.users);

        this.users = this.users.filter((user: any) => user.isVisible == 1);

        // console.log('mame', this.users);

      }
    })

  }

  redirectToAddUser() {
    const navigation = "/superadmin/users/add"
    this.router.navigateByUrl(navigation)
  }

  redirectToEditUser(idv: number) {
    this.router.navigate(["/superadmin/users/edit/" + idv]);
  }


  showSuccess() {
    this.toastr.success('L\'utilisateur a été supprimée avec succès!', 'Suppression!');
  }

  deleteUser(user: User) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Voulez-vous vraiment supprimer l'utilisateur?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer cet utilisateur !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme, changer l'état de l'utilisateur
        this.userserv.changeVisibility(user).subscribe({

        });
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(["/superadmin/users"]);
          this.showSuccess()
        });

      }
    });
  }


  afficherDetailsUser(user: User) {
    this.userselected = user; // Affecter les informations de la voiture sélectionnée à la variable
  }

  redirectToParkings(idp: number) {

    this.router.navigate(["/superadmin/users/" + idp + "/" + "details-user"]);

  }

}

