import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DetailBudgetServiceService {
  private baseUrl = 'http://localhost:8081/detailBudget';
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get(this.baseUrl);
  }
  createDetailBudget(detailBudget) {
    return this.http.post(this.baseUrl, detailBudget, { responseType: 'text' });
  }
  changeStatus(detail) {
    return this.http.put(`${this.baseUrl}/changeStatus`, detail);
  }
  DeleteDetailBudget(detailBudget) {
    return this.http.delete(this.baseUrl, detailBudget);
  }
  UpdateDetail(detail) {
    return this.http.put(this.baseUrl, detail);
  }
  sendMessage(detail) {
    return this.http.put(`${this.baseUrl}/sendMessage`, detail);
  }
  
}
