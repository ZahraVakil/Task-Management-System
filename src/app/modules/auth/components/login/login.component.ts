import { UserRolesService } from './../../../../core/services/shared/user-roles.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm : any = FormGroup;

  constructor(private formBuilder: FormBuilder, private authService : AuthService, private userRoleService: UserRolesService,  private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.authService.loginUser(credentials).subscribe({
        next: (res: any) => {
          localStorage.setItem(
            'access_token',
            JSON.stringify(res.access_token)
          );
          localStorage.setItem(
            'refresh_token',
            JSON.stringify(res.refresh_token)
          );

          this.userRoleService.isLoggedIn();
          this.toastr.success('Login Successfully', '', {
            timeOut: 2000,
          });

          this.router.navigate(['/']);
        },
        error: (err: any) => {
          this.toastr.error('Invalid Credentials', err.error.message, {
            timeOut: 2000,
          });
          console.log(err);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();

    }
  }

}
