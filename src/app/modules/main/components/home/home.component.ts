import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRolesService } from 'src/app/core/services/shared/user-roles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedInUser: any;
  isLoggedIn : any;


  constructor(
    private userRoleService: UserRolesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userRoleService.userProfile$.subscribe(
      (userProfile) => {
        this.loggedInUser = userProfile;
        this.isLoggedIn = !!userProfile;
  
        console.log('User Profile:', userProfile);
        console.log('Is Logged In:', this.isLoggedIn);
      }
    );
  }
 
}
