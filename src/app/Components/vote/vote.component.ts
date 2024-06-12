import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/Services/budget.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  budgets;
  constructor(private budgetService: BudgetService ) { }

  ngOnInit(): void {
    this.getAllBudgets();
  }

  getAllBudgets() {
    this.budgetService.getAll().subscribe((data) => {
      this.budgets = data;
      console.log('dataaa', this.budgets);
    });
  }
}
