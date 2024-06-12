import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historique } from '../Models/historique';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  private baseUrl = 'http://localhost:8081/historique';

  constructor(private http: HttpClient) { }
  getAllHistoriques():Observable<Historique[]>{
    return this.http.get<Historique[]>(this.baseUrl+"/");
  }
}
