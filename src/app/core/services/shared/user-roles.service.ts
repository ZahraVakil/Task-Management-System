import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  constructor(private authService: AuthService) {
    this.isLoggedIn();
  }

  private profileSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    'none'
  );
  public userProfile$: Observable<any> = this.profileSubject.asObservable();

  isLoggedIn() {
    this.authService.getUserProfile().subscribe({
      next: (res: any) => {
        console.log(res);
        this.profileSubject.next(res);
      },
      error: (res: any) => {
        console.log(res);
        this.profileSubject.next(null);
      },
    });
  }

}
