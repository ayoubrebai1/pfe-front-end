import { CentreResponsabiliteService } from 'src/app/Services/centre-responsabilite.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from 'src/app/Services/budget.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  budgets;
  constructor(
    private budgetSerice: BudgetService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  id;
  eventsource;
  role = localStorage.getItem('role');
  budgetForm = this.formBuilder.group({
    libelle_budget: [''],
    date_budget: [''],
  });
  ngOnInit(): void {
    this.getBudgets();
    this.id = this.activatedRoute.snapshot.paramMap.get('id_centre');
    console.log('id', this.id);
  }

  getBudgets() {
    this.budgetSerice.getAll().subscribe((data) => {
      this.budgets = data;
      this.budgets = this.budgets.filter(
        (b) => b['centre_responsabilite'].id_centre_responsabilite == this.id
      );
      console.log('budgets', this.budgets);
    });
  }
  onSubmit() {
    let obj = {
      libelle_budget: this.budgetForm.value.libelle_budget,
      date_budget: this.budgetForm.value.date_budget,
      centre_responsabilite: {
        id_centre_responsabilite: localStorage.getItem('id_centre'),
      },
    };
    console.log('budget', this.budgetForm.value);
    this.budgetSerice.createBudget(obj).subscribe((data) => {
      console.log('data', data);
      this.getBudgets();
      this.budgetForm.reset();
      this.toastr.success('Budget ajouté ');
    });
  }
  deleteBudget(budget) {
    let obj = {
      id_budget: budget.id_budget,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: obj,
    };
    this.budgetSerice.DeleteBudget(options).subscribe(() => {
      this.budgets = this.budgets.filter((b) => b != budget);
      console.log('budget deleted');
      this.toastr.error('Budget supprimé ');
    });
  }
  redirectedToDetails(budget) {
    this.router.navigate(['/details', budget.id_budget]);
  }
}
