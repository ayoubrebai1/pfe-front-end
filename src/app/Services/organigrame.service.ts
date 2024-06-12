import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { organigrame } from '../Models/organigrame';

@Injectable({
  providedIn: 'root'
})
export class OrganigrameService {
   headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   options = { headers: this.headers };

  private baseUrl = 'http://localhost:8081/organigramme';
  constructor(private http:HttpClient) { }
  
  createOrganigrame(organigrame:any):Observable<any>{
   
    return this.http.post<any>(this.baseUrl,organigrame, this.options);
  }
  getAllOrgs(){
    return this.http.get(this.baseUrl);
  }

}
