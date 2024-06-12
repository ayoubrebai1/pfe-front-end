import { AccountService } from './Services/account.service';
import { Component, OnInit } from '@angular/core';
import { type } from 'node:os';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ProjetBudget';
  bool: Boolean;
  constructor(private accountService: AccountService) {}
  ngOnInit(): void {
    this.accountService.authStatus.subscribe((res) => {
      console.log('res', typeof res);
      this.bool = res;
    });
  }
}
