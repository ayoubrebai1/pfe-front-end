import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import jwt_decode from 'jwt-decode';
export const TOKEN_NAME: string = 'token';
let header = new HttpHeaders();

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8081/user';
  constructor(private http: HttpClient) {}

  getUserByEmail(email) {
    return this.http.get(`${this.baseUrl}/${email}`);
  }

  getAll() {
    return this.http.get(this.baseUrl);
  }
  DeleteUser(user) {
    return this.http.delete(this.baseUrl, user);
  }
  changePassword(user) {
    return this.http.put(`${this.baseUrl}/resetPassword`, user);
  }
  updateUser(user) {
    return this.http.put(this.baseUrl, user);
  }
  createUser(user): Observable<any> {
    return this.http.post(this.baseUrl, user, { responseType: 'text' });
  }
  changeStatus(user) {
    return this.http.put(`${this.baseUrl}/changeStatus`, user);
  }
  login(email, password) {
    return this.http.post<User>('http://localhost:8081/login', {
      email,
      password,
    });
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded['exp'] === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded['exp']);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  LoggedIn() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  setRole(role) {
    localStorage.setItem('role', role);
  }
  setCentre(centre){
    localStorage.setItem('id_centre', centre);
  }
}
