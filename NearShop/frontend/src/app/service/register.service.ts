import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  http: HttpClient;
  constructor(private httpClient: HttpClient) { 
    this.http = httpClient;
  }
  register(username: String, password: String, email: String) {
    const body = {
      email,
      username,
      password,
      
    };

    return this.http.post(`/api/users/signup`, body);
  }
}