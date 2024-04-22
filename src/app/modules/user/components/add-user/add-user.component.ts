import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm:any= FormGroup;
  roles: string[] = ['customer', 'admin'];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      image: [''],
      role: ['customer', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = {
        name: this.userForm.get('name').value,
        email: this.userForm.get('email').value,
        password: this.userForm.get('password').value,
        avatar: this.userForm.get('image').value || '',
        role: this.userForm.get('role').value
      };
      console.log(this.userForm.get('image').value);
      this.userService.addUser(userData).subscribe({
        next: () => {
          alert('User added successfully');
          this.router.navigate(['/user/allUser']);
        },
        error: (err: any) => {
          console.error(err);
          alert('Failed to add user');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/user/allUser']);
  }
}
