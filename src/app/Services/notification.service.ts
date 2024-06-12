import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUrl = 'http://localhost:8081/notification';

  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get(this.baseUrl);
  }
  createNotification(notification) {
    return this.http.post(this.baseUrl,notification, { responseType: 'text' });
  }
}
