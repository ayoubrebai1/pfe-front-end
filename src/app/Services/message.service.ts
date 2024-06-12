import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl = 'http://localhost:8081/message';
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get(this.baseUrl);
  }
  createMessage(msg) {
    return this.http.post(this.baseUrl, msg, { responseType: 'text' });
  }
}
