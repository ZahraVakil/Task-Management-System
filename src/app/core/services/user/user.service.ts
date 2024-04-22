import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  userURL: string = environment.baseURL + environment.user_url;

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.userURL);
  }

  getUser(userId: number) {
    return this.http.get(this.userURL + `/${userId}`);
  }

  addUser(user: any) {
    return this.http.post(this.userURL, user);
  }

  updateUser(userId: any, user: any) {
    return this.http.put(this.userURL + `/${userId}`, user);
  }

  checkEmail(email: any) {
    return this.http.post(this.userURL + '/is-available', email);
  }

 
  deleteUser(userId: any) {
    return this.http.delete(this.userURL + `/${userId}`);
  }
}
