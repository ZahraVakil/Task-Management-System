import { Sheet } from './../../../../../../node_modules/xlsx/types/index.d';
// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from 'src/app/core/services/user/user.service';

// @Component({
//   selector: 'app-all-users',
//   templateUrl: './all-users.component.html',
//   styleUrls: ['./all-users.component.css']
// })
// export class AllUsersComponent implements OnInit {

//   // users: any[] = [];
//   // showColumns: string[] = ['id', 'name', 'email',
//   // 'password',
//   // 'avatar', 'role', 'action'];

//   // constructor(private userService: UserService) {}

//   // ngOnInit(): void {
//   //   this.userService.getAllUsers().subscribe({
//   //     next: (res: any) => {
//   //       this.users = res;
//   //       console.log(res);
//   //     },
//   //     error: (err: any) => {
//   //       console.log(err);
//   //     },
//   //   });
//   // }

// }

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user/user.service';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';

interface User {
  id?: string;
  isNew: boolean;
  userForm: FormGroup;
}

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  users:  MatTableDataSource<User>;;
  userFormArray: any = FormArray;
  showColumns: string[] = [
    'id',
    'name',
    'email',
    'password',
    'avatar',
    'role',
    'actions',
  ];

  displayedRole = ['customer', 'admin'];
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private fileSaver: FileSaverService
  ) {
    this.users = new MatTableDataSource<User>([]);
  }

  ngOnInit(): void {
    this.getAllUsers();
  }


  exportExcel(){
    const userData = this.users.data.map((user) => {
      const { id, userForm } = user;
      const formValues = userForm.value;
      return {
        Id: id,
        Name: formValues.name,
        Email: formValues.email,
        Role: formValues.role,
        Avatar: formValues.avatar,
      };
    });


    //common code
    const EXCEL_TYPE =  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    //create worksheet
    const worksheet = XLSX.utils.json_to_sheet(userData);

    // Create a workbook -- sheet configuration 
    const workbook = {
      Sheets : {
        'userExcelFile': worksheet
      },
      SheetNames : ['userExcelFile']
    }


    // create excel buffer, binary string
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Save file
    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE});
    this.fileSaver.save(blobData, "userData");

  }

  getAllUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users.data = res.map((user: any) => ({
          id: user.id,
          isNew: false,
          userForm: this.fb.group({
            name: [user.name, [Validators.required]],
            email: [user.email, [Validators.required, Validators.email]],
            password: [
              user.password,
              [Validators.required, Validators.minLength(4)],
            ],
            role: [user.role, [Validators.required]],
            avatar: [user.avatar, [Validators.required]],
          }),
        }));
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }


  addUser() {
    const newUser: User = {
      isNew: true,
      userForm: this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        role: ['', [Validators.required]],
        avatar: ['', [Validators.required]],
      }),
    };
    this.users.data.push(newUser);
    this.users._updateChangeSubscription();
  }

  
  
  // saveNewUser(index: number) {
  //   const user = this.users.data[index];
  //   const newUserForm = user.userForm;
  
  //   // Mark all form controls as touched to trigger validation messages
  //   Object.keys(newUserForm.controls).forEach((controlName) => {
  //     newUserForm.get(controlName)?.markAsTouched();
  //   });
  
  //   if (newUserForm.valid) {
  //     const { name, email, password, role, avatar } = newUserForm.value;
  
  //     // Check if the email is already used by another user
  //     const isEmailUsed = this.users.data.some((existingUser) => {
  //       return existingUser.userForm.value.email === email;
  //     });
  
  //     if (isEmailUsed) {
  //       this.toastr.error('Email is already in use. Please enter a different email.', '', {
  //         timeOut: 2000,
  //       });
  //     } else {
  //       // If the email is not used, proceed to save the new user
  //       this.addNewUser({ name, email, password, role, avatar }, user);
  //       user.isNew = false;
  //       this.users._updateChangeSubscription();
  //     }
  //   }
  // }
  

  saveNewUser(index: number) {
    const user = this.users.data[index];
    const newUserForm = user.userForm;
  
  //mark all comntrols touch or show validations 
    Object.keys(newUserForm.controls).forEach((controlName) => {
      newUserForm.get(controlName)?.markAsTouched();
    });
  
    if (newUserForm.valid) {
      const { name, email, password, role, avatar } = newUserForm.value;
  
      const isEmailUsed = this.users.data.some((existingUser, i) => {
        return i !== index && existingUser.userForm.value.email === email;
      });
  
      if (isEmailUsed) {
        this.toastr.error('Email is already in use. Please enter a different email.', '', {
          timeOut: 2000,
        });
      } else {
        this.addNewUser({ name, email, password, role, avatar }, user);
        user.isNew = false;
        this.users._updateChangeSubscription();
      }
    }
  }
  
  addNewUser(data: any, user: User) {
    this.userService.addUser(data).subscribe({
      next: (res: any) => {
        user.id = res.id;
          this.toastr.success('User Added Successfully', '', {
          timeOut: 1000,
           });
         },
      error: (err) => {
        this.toastr.error('Try Again!', 'Error in adding new user', {
          timeOut: 1000,
           });
      },
    });
  }

  cancelUser(index: number) {
    this.users.data.splice(index, 1);
    this.users._updateChangeSubscription();
  }



updateUser(index: number) {
    const user = this.users.data[index];
    if (user.userForm.valid) {
      const { id } = user;
      const { name, email, password, role, avatar } = user.userForm.value;
      let object = {
        name: name,
        email: email,
        password: password,
        role: role,
        avatar: avatar,
      };

      this.userService.updateUser(id, object).subscribe({
        next: (res) => {
          this.toastr.success('User Updated Successfully', '', {
            timeOut: 1000,
             });
          this.users._updateChangeSubscription();
        },
        error: (res) => {
          this.toastr.error('Try Again!', 'Error in updating user', {
            timeOut: 1000,
             });
        },
      });
    }
  }

  deleteUser(index: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      const user = this.users.data[index];
      this.userService.deleteUser(user.id).subscribe({
        next: (res) => {
          this.toastr.success('User Deleted Successfully', '', {
            timeOut: 1000,
          });
          this.getAllUsers();
        },
        error: (err) => {
          this.toastr.error(err.error.message, '', {
            timeOut: 3000,
          });
        },
      });
    }
  }
  
  // submitUserForms(): void {
  //   if (this.userFormArray.valid) {
  //     const userForm = this.userFormArray.at(0);
  //     const userToAdd = userForm.value;

  //     // email already exists
  //     const duplicateEmail = this.users.some(
  //       (user) => user.email === userToAdd.email
  //     );

  //     if (duplicateEmail) {
  //       this.toastr.error(
  //         'Email already exists. Please enter a different email.',
  //         '',
  //         {
  //           timeOut: 2000,
  //         }
  //       );
  //     } else {
  //       this.userService.addUser(userToAdd).subscribe({
  //         next: (res: any) => {
  //           console.log(res);
  //           this.toastr.success('User Added Successfully', '', {
  //             timeOut: 1000,
  //           });
  //           //remove form row
  //           this.showAddUserForm = !this.showAddUserForm;

  //           this.refreshUserList();
  //         },
  //         error: (err: any) => {
  //           console.log(err);
  //         },
  //       });
  //     }
  //   } else {
  //     // Handle invalid form
  //     this.toastr.error('Form is Invalid', '', {
  //       timeOut: 1000,
  //     });
  //   }
  // }

  // submitUserForms(): void {
  //   if (this.userFormArray.valid) {
  //     const userForm = this.userFormArray.at(0);
  //     const userToAdd = userForm.value;

  //     const email = userToAdd.email;

  //     // Check if email is available
  //     this.userService.checkEmail().subscribe({
  //       next: (response: any) => {
  //         if (response.isAvailable) {
  //           // Email is available, proceed to add user
  //           this.userService.addUser(userToAdd).subscribe({
  //             next: (res: any) => {
  //               console.log(res);
  //               this.toastr.success('User Added Successfully', '', {
  //                 timeOut: 1000,
  //               });
  //               //remove form row
  //               this.showAddUserForm = !this.showAddUserForm;

  //               this.refreshUserList();
  //             },
  //             error: (err: any) => {
  //               console.log(err);
  //             },
  //           });
  //         } else {
  //           // Email is not available
  //           this.toastr.error('Email is already taken', '', {
  //             timeOut: 2000,
  //           });
  //         }
  //       },
  //       error: (err: any) => {
  //         console.log(err);
  //       },
  //     });
  //   } else {
  //     this.toastr.error('Form is Invalid', '', {
  //       timeOut: 1000,
  //     });
  //   }
  // }


  // submitUserForms(): void {
  //   if (this.userFormArray.valid) {
  //     const userForm = this.userFormArray.at(0);
  //     const userToAdd = userForm.value;

  //     // email already exists
  //     const duplicateEmail = this.users.some(
  //       (user) => user.email === userToAdd.email
  //     );

  //     if (duplicateEmail) {
  //       this.toastr.error(
  //         'Email already exists. Please enter a different email.',
  //         '',
  //         {
  //           timeOut: 2000,
  //         }
  //       );
  //     } else {
  //       this.userService.addUser(userToAdd).subscribe({
  //         next: (res: any) => {
  //           console.log(res);
  //           this.toastr.success('User Added Successfully', '', {
  //             timeOut: 1000,
  //           });
  //           //remove form row
  //           this.showAddUserForm = !this.showAddUserForm;

  //           this.refreshUserList();
  //         },
  //         error: (err: any) => {
  //           console.log(err);
  //         },
  //       });
  //     }
  //   } else {
  //     // Handle invalid form
  //     this.toastr.error('Form is Invalid', '', {
  //       timeOut: 1000,
  //     });
  //   }
  // }



  
 
}
