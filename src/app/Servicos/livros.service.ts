import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models/livros';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private apiurl = 'https://localhost:7281/api/livros';

  constructor(private http: HttpClient) { }

  getLivros(): Observable<Livro[]> {
    const token = localStorage.getItem('tokenApi');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.get<Livro[]>(this.apiurl, { headers });
  }

  getLivroById(id: number): Observable<Livro> {
    const token = localStorage.getItem('tokenApi');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.get<Livro>(`${this.apiurl}/${id}`, { headers });
  }

  postLivro(livro: Livro): Observable<Livro> {
    const token = localStorage.getItem('tokenApi');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.post<Livro>(this.apiurl, livro, { headers });
  }

  deleteLivro(id: number): Observable<void> {
    const token = localStorage.getItem('tokenApi');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.delete<void>(`${this.apiurl}/${id}`, { headers });
  }
}
