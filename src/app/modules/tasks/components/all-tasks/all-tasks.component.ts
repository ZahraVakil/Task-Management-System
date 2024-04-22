import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { UserService } from 'src/app/core/services/user/user.service';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';



@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent {

  tasks: any[] = [];
  users: any[] = [];
  current_user: any;

  showColumns: string[] = [
    'id',
    'title',
    'description',
    'assignee',
    'dueDate',
    'priority',
    'status',
    'actions',

  ];
  statusOptions: string[] = ['completed', 'pending'];

  priorityOptions: string[] = ['Critical', 'Medium', 'Low'];


  taskFormArray: any;
  dataSource: any;


  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private fileSaver: FileSaverService

  ) {}

  ngOnInit(): void {
    
    this.taskFormArray = this.fb.array([]);

    this.getUsers();
    this.getAllTasks();

    this.authService.getUserProfile().subscribe({
      next: (res: any) => {
        this.current_user = res;
      },
    });

    console.log(this.current_user);
  }



  exportExcel(): void {
    const taskData = this.tasks.map(task => {
      const assignee = this.users.find(user => user.name === task.assignee);

      return {
        id: task.id,
        title: task.title,
        description: task.description,
        assignee: task.assignee,
        assigneeID: assignee ? assignee.id : '', 
        DueDate: task.dueDate,
        priority: task.priority,
        status: task.status,
      };
    });


    //common code
    const EXCEL_TYPE =  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const worksheet = XLSX.utils.json_to_sheet(taskData);

    const workbook = {
      Sheets : {
        'taskExcelFile': worksheet
      },
      SheetNames : ['taskExcelFile']
    }

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

   // Save file
   const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE});
   this.fileSaver.save(blobData, "taskData");

  }

  // readExcel(){
  //   let file = event?.target.files[0]
  // }

  getAllTasks(){
    this.taskService.getAllTasks().subscribe({
      next: (res: any) => {
        this.tasks = res;
        this.tasks.forEach((task) => {
          this.taskFormArray.push(this.createTaskFormGroup(task));
        });
        this.dataSource = new MatTableDataSource(this.taskFormArray.controls);
      },
    });
  }

  getUsers(){
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res;
      },
    });
  }

 
  addTask(): void {
    const newTask = {
      id:  Date.now(),
      title: '',
      description: '',
      created_by: this.current_user.name,
      assignee: '',
      status: '',
      priority: '',
      dueDate: ''
    };

   

  // this.toastr.success('New task row added. Fill in the details.', 'Success');
  //   // this.tasks.push(newTask);
    this.taskFormArray.push(this.createTaskFormGroup(newTask));
    this.dataSource = new MatTableDataSource(this.taskFormArray.controls);
  }

  createTaskFormGroup(task: any): FormGroup {
    return this.fb.group({
      id: [task.id],
      title: [task.title],
      description: [task.description],
      assignee: [task.assigned_to],
      status: [task.status],
      priority: [task.priority],
      dueDate: [task.due_date]
    });
  }


  addTaskToForm(task: any): void {
    const taskFormGroup = this.createTaskFormGroup(task);
    this.taskFormArray.setControl(task.id.toString(), taskFormGroup);
    this.dataSource.data = this.taskFormArray.controls;
          this.tasks.push(task);

  }

  addValidations(column: string, i: number) {
    const control = this.taskFormArray.controls[i].get(column);

    if (control) {
      control.setValidators(Validators.required);
      control.updateValueAndValidity();
    }
  }


  // onSave(taskIndex: number) {
  //   console.log('onsave called');
  //   let isAvailable = false;
  //   const taskForm = this.taskFormArray.at(taskIndex) as FormGroup;
  //   if (taskForm.valid) {
  //     const newTask = taskForm.value;

  //     for (let t of this.tasks) {
  //       if (t.id == newTask.id) {
  //         isAvailable = true;
  //       }
  //     }
  //     if (!isAvailable) {
  //       this.taskService.addTask(newTask);
  //       this.toastr.success('Task added successfully', 'Success');
  //       this.tasks = [...this.tasks, newTask];
  //     } else {
  //       this.taskService.editTask(newTask.id, newTask);
  //       this.toastr.success('Task updated successfully', 'Success');
  //     }
  //   } else {
  //     this.toastr.error('Please fill the form properly', 'ERROR💥');
  //   }
  // }


  // onSave() {
  //   // Check if the form is valid
  //   if (this.taskFormArray.valid) {
  //     // Extract the new task data from the form
  //     const newTask = this.taskFormArray.value;
  
  //     // Check if the task ID already exists in the list of tasks
  //     const existingTaskIndex = this.tasks.findIndex(task => task.id === newTask.id);
  
  //     if (existingTaskIndex === -1) {
  //       // If the task ID doesn't exist, add the new task
  //       this.taskService.addTask(newTask);
  //       this.toastr.success('Task added successfully', 'Success');
  //       this.addTaskToForm(newTask);

  //     } else {
  //       // If the task ID exists, update the existing task
  //       this.taskService.editTask(newTask.id, newTask);
  //       this.toastr.success('Task updated successfully', 'Success');
  //       this.tasks[existingTaskIndex] = newTask;
  //     }
  //   } else {
  //     // If the form is invalid, display an error message
  //     this.toastr.error('Please fill the form properly', 'ERROR💥');
  //   }
  // }
  


  // Method to save all valid tasks
// onSave() {
//   let success = false;
//   this.taskFormArray.controls.forEach((taskForm: FormGroup) => {
//     if (taskForm.valid) {
//       const taskData = taskForm.value;

//       // Determine whether this task exists
//       const existingTaskIndex = this.tasks.findIndex((task) => task.id === taskData.id);

//       if (existingTaskIndex === -1) {
//         // If it doesn't exist, add it
//         this.taskService.addTask(taskData).subscribe({
//           next: () => {
//             this.tasks.push(taskData); // Update the local tasks list
//             this.toastr.success('Task added successfully', 'Success');
//             success = true;
//           },
//           error: (error) => {
//             console.error('Error adding task:', error);
//             this.toastr.error('Failed to add task.', 'Error');
//           },
//         });
//       } else {
//         // If it exists, update it
//         this.taskService.editTask(taskData.id, taskData).subscribe({
//           next: () => {
//             this.tasks[existingTaskIndex] = taskData; // Update the local tasks list
//             this.toastr.success('Task updated successfully', 'Success');
//             success = true;
//           },
//           error: (error) => {
//             console.error('Error updating task:', error);
//             this.toastr.error('Failed to update task.', 'Error');
//           },
//         });
//       }
//     } else {
//       this.toastr.error('Please fill in all required fields correctly.', 'Validation Error');
//     }
//   });

//   if (success) {
//     this.dataSource.data = this.taskFormArray.controls; // Refresh the data source
//   }
// }
  
onSave() {
  let anySuccess = false;
  
  this.taskFormArray.controls.forEach((taskForm: FormGroup) => {
    // Check if all critical fields are empty
    const isRowEmpty = ['title', 'description', 'assignee', 'dueDate', 'priority', 'status']
      .every((field) => {
        const control = taskForm.get(field);
        return !control || control.value === '' || control.value === null;
      });

    if (isRowEmpty) {
      // If all critical fields are empty, show an error message
      this.toastr.error('Cannot add or save an empty row. Please fill in at least one critical field.', 'Validation Error');
      return;
    }

    // Mark all controls as touched (for visual feedback)
    Object.keys(taskForm.controls).forEach((controlName) => {
      const control = taskForm.get(controlName);
      control?.markAsTouched(); // Mark each control as touched
    });

    if (taskForm.valid) {
      const taskData = taskForm.value;
      const existingTaskIndex = this.tasks.findIndex((task) => task.id === taskData.id);

      if (existingTaskIndex === -1) {
        // Add the new task
        this.taskService.addTask(taskData).subscribe({
          next: () => {
            this.tasks.push(taskData);
            this.toastr.success('Task added successfully', 'Success');
            anySuccess = true;
          },
          error: (error) => {
            console.error('Error adding task:', error);
            this.toastr.error('Failed to add task.', 'Error');
          },
        });
      } else {
        // Update existing task
        this.taskService.editTask(taskData.id, taskData).subscribe({
          next: () => {
            this.tasks[existingTaskIndex] = taskData;
            this.toastr.success('Task updated successfully', 'Success');
            anySuccess = true;
          },
          error: (error) => {
            console.error('Error updating task:', error);
            this.toastr.error('Failed to update task.', 'Error');
          },
        });
      }
    } else {
      this.toastr.error('Please fill in all required fields correctly.', 'Validation Error');
    }
  });

  if (anySuccess) {
    this.dataSource.data = this.taskFormArray.controls; // Refresh the data source
  }
}


  onDelete(taskIndex: number) {
    const confirmed = confirm('Are you sure?');
    if (!confirmed) return;

    const taskForm = this.taskFormArray.at(taskIndex) as FormGroup;
    const taskId = taskForm.value.id;

    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);

      this.taskFormArray.clear();

      this.tasks.forEach((task) => {
        this.taskFormArray.push(this.createTaskFormGroup(task));
      });

      this.dataSource = new MatTableDataSource(this.taskFormArray.controls);

      this.toastr.success('Task deleted successfully', 'Success');
    });
  }


  
   
 }
