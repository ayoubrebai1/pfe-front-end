import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeCentreResponsabilite } from '../Models/type-centre-responsabilite';

@Injectable({
  providedIn: 'root'
})
export class TypeCentreResponsabiliteService {
  private baseUrl = 'http://localhost:8081/TypeCentreResponsabilite';
  constructor(private http:HttpClient) { }

  createTypeResponsabilityCenter(typeCentreResponsabilite:TypeCentreResponsabilite):Observable<any>{
    return this.http.post<TypeCentreResponsabilite>(this.baseUrl,typeCentreResponsabilite);
   }
   getAllTypesResponsabilityCenter():Observable<TypeCentreResponsabilite[]>{
     return this.http.get<TypeCentreResponsabilite[]>(this.baseUrl);
   }
}
