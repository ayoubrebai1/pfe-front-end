import { Profile } from './../Models/profile';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'http://localhost:8081/profile';
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(this.baseUrl);
  }
  CreateProfile(obj: Profile) {
    return this.http.post(this.baseUrl, obj);
  }
  RemoveProfil(profil) {
    return this.http.delete(this.baseUrl, profil);
  }
}
