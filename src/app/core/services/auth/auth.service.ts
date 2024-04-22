import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginURL : string = environment.baseURL + environment.login_url;
  getProfileUrL: string = environment.baseURL + environment.get_profile_url;

  constructor(private http: HttpClient) {}


  loginUser(credentials: any) {
    return this.http.post(this.loginURL, credentials);
  }

  getUserProfile() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Access token not available');
    }

    return this.http.get(this.getProfileUrL);
  }

}
