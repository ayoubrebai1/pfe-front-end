import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CentreResponsabilite } from '../Models/centre-responsabilite';

@Injectable({
  providedIn: 'root',
})
export class CentreResponsabiliteService {
  private baseUrl = 'http://localhost:8081/centreResponsabilite';

  constructor(private http: HttpClient) {}

  createResponsabilityCenter(centreResponsabilite) {
    return this.http.post(this.baseUrl, centreResponsabilite);
  }
  getAll() {
    return this.http.get(this.baseUrl);
  }
  // deleteResponsabilityCenter(id_centre_responsabilite:number):Observable<any>{
  //   return this.http.delete(this.baseUrl +`/${id_centre_responsabilite}`);
  // }
  // updateResponsabilityCenter(id_centre_responsabilite:number,centreResponsabilite:CentreResponsabilite):Observable<any>{
  //   return this.http.put(this.baseUrl+`/${id_centre_responsabilite}`,centreResponsabilite)
  // }
  // getOneResponsabilityCenter(id_centre_responsabilite:number):Observable<any>{
  //   return this.http.get(this.baseUrl+`/${id_centre_responsabilite}`);
  // }
  deleteCentre(centre) {
    return this.http.delete(this.baseUrl, centre);
  }
}
