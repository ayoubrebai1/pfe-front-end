import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypeBudgetService {
  private baseUrl = 'http://localhost:8081/rubriqueBudget';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }
  CretaeTypeBydget(type) {
    return this.http.post(this.baseUrl, type);
  }
  DeleteTypeBudget(type) {
    return this.http.delete(this.baseUrl, type);
  }
}
