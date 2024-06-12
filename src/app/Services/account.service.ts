import { UserService } from 'src/app/Services/user.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private loggedIn = new BehaviorSubject<Boolean>(this.userService.LoggedIn());
  authStatus = this.loggedIn.asObservable();
  constructor(private userService: UserService) {}
  changeStus(value: Boolean) {
    this.loggedIn.next(value);
  }
}
