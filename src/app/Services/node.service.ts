import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Node } from '../Models/node';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private baseUrl = 'http://localhost:8081/node';


  constructor(private http:HttpClient) { }

  createNode(node:Node):Observable<any>{
    return this.http.post<Node>(this.baseUrl+"/",node);
   }
   getAllNodes():Observable<Node[]>{
    return this.http.get<Node[]>(this.baseUrl+"/");
  }
}
