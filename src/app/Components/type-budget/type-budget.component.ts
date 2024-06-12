import { TypeBudgetService } from './../../Services/type-budget.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-type-budget',
  templateUrl: './type-budget.component.html',
  styleUrls: ['./type-budget.component.css'],
})
export class TypeBudgetComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private typeService: TypeBudgetService
  ) {}
  TypeForm: FormGroup;
  typesBudget;
  ngOnInit(): void {
    this.TypeForm = this.formBuilder.group({
      libelle: ['', [Validators.required]],
    });
    this.getTypeBudget();
  }
  onSubmit() {
    this.typeService.CretaeTypeBydget(this.TypeForm.value).subscribe((data) => {
      console.log('data', data);
      this.TypeForm.reset();
      this.getTypeBudget();
      this.toastr.success('Type Budgetajouté');
    });
  }
  getTypeBudget() {
    this.typeService.getAll().subscribe((data) => {
      console.log('data', data);
      this.typesBudget = data;
    });
  }
  deleteTypeBudget(type) {
    let obj = {
      id_rubrique: type.id_rubrique,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: obj,
    };
    this.typeService.DeleteTypeBudget(options).subscribe((data) => {
      this.typesBudget = this.typesBudget.filter(
        (p) => p.id_rubrique != type.id_rubrique
      );
      this.toastr.error('Type budget supprimé');
    });
  }
}
