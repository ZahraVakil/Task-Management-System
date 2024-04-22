import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRolesService } from 'src/app/core/services/shared/user-roles.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  userRole: any;
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
        this.userRole = userProfile?.role;
        this.isLoggedIn = !!userProfile;
  
        console.log('User Profile:', userProfile);
        console.log('Logged In User:', this.loggedInUser);
        console.log('User Role:', this.userRole);
        console.log('Is Logged In:', this.isLoggedIn);
      }
    );
  }
   

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.userRoleService.isLoggedIn();
    this.router.navigate(['auth/login']);
    // this.isLoggedIn = false;
  }
}
