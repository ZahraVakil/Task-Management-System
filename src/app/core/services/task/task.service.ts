import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() {}

  private taskSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public tasks$: Observable<any> = this.taskSubject.asObservable();

  getAllTasks(): Observable<any> {
    let tasks: any = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks) || [];
    return of(tasks);
  }

  addTask(task: any) {
    let tasks: any = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks) || [];
    tasks = [...tasks, task];

    console.log('add task called');

    localStorage.setItem('tasks', JSON.stringify(tasks));

    return of(task);
  }

  // editTask(taskId: number, updatedTask: any) {
  //   let tasks: any = localStorage.getItem('tasks');
  //   tasks = JSON.parse(tasks) || [];

  //   tasks = tasks.map((task: any) => {
  //     if (task.id == taskId) {
  //       return updatedTask;
  //     } else return task;
  //   });

  //   console.log('edit task called');

  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }


  editTask(taskId: number, updatedTask: any): Observable<any> {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.map((task: any) => (task.id === taskId ? updatedTask : task));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  
    return of(true); // Observable returned
  }
  
  deleteTask(taskId: number): Observable<any> {
    let tasks: any = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks) || [];

    tasks = tasks.filter((task: any) => task.id != taskId);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    return of(true);
  }}
  
