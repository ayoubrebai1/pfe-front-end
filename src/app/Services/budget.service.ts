import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from '../Models/budget';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private baseUrl = 'http://localhost:8081/budget';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }
  DeleteBudget(budget) {
    return this.http.delete(this.baseUrl, budget);
  }
  createBudget(budget) {
    return this.http.post(this.baseUrl, budget, { responseType: 'text' });
  }
  updateBudget(budget) {
    return this.http.put(this.baseUrl, budget);
  }
  updateMontant_total(id, montant) {
    return this.http.get(`${this.baseUrl}/updateMontant/${id}/${montant}`);
  }
  // get() {
  //   return this.http.get('http://localhost:8081/stream');
  // }
}
