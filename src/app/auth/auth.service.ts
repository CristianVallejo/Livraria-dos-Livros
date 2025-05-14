import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiurl = 'https://localhost:7281';

  constructor(private http: HttpClient, private router: Router) {}

  login(dados: {
    Login: string;
    Password: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiurl}/api/login`, dados);
  }

  salvarToken(token: string): void {
    localStorage.setItem('tokenApi', token);
  }
  salvarIdUsuario(id: string): void {
    localStorage.setItem('idUsuario', id);
  }

  ObterToken(): string | null {
    return localStorage.getItem('tokenApi');
  }

  logout(): void {
    localStorage.removeItem('tokenApi');
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    return !!this.ObterToken();
  }
}
