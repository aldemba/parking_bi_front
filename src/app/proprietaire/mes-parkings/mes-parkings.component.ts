import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ParkingsService } from 'src/app/shared/services/parkings.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { filter } from "rxjs/operators";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mes-parkings',
  templateUrl: './mes-parkings.component.html',
  styleUrls: ['./mes-parkings.component.css']
})
export class MesParkingsComponent {
  //  routerObservableInstance$:any;

  // routerObservableInstance$!: Subscription;

  parkings:any
  loading: boolean = true; 


  constructor(private tokserv:TokenService, private parkserv:ParkingsService,private router:Router){
    //  this.subscribeToRouteChange();
  }
  
  ngOnInit(){
    
    let idClientConnecté: any;
    const idFromStorage = this.tokserv.getIdFromStorage();
    if (idFromStorage !== null && idFromStorage !== undefined) {
        idClientConnecté = +idFromStorage;
    }
    

    this.parkserv.getParkingsById(+idClientConnecté).subscribe({next:data =>{
    //  console.log(data);
      
      this.parkings=data.allParkings.filter((p:any) => p.isVisible==1)
      // console.log(this.parkings);
      
      this.loading = false;
    }, 
  
  }), (error:any)=>{
    this.loading = false;

  }
    

    // console.log(this.parkings);  

  }
  
  // subscribeToRouteChange() {
  //   this.routerObservableInstance$ = this.router.events.pipe(
  //     filter((event): event is NavigationEnd => event instanceof NavigationEnd)
  //   ).subscribe((event: NavigationEnd) => {
  //     if (event.urlAfterRedirects.includes('voitures')) {
  //       window.history.pushState('', '', '/path/guided/');
  //     }
  //   });
  // }

}
