import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';  // Spring Boot API URL

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
        
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    // Remove user profile from local storage when logging out
    localStorage.removeItem('userProfile');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userProfile');  
  }
  
}
