import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypeCentreService {
  private baseUrl = 'http://localhost:8081/TypeCentreResponsabilite';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }
  DeleteCentreResponsability(centre) {
    return this.http.delete(this.baseUrl, centre);
  }
  updateTypeCentreResponsability(centre) {
    return this.http.put(this.baseUrl, centre);
  }
  createTypeCentreResponsability(centre) {
    return this.http.post(this.baseUrl, centre, { responseType: 'text' });
  }
}
