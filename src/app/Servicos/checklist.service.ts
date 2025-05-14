import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Checklist } from '../models/checklist';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private apiurl = 'https://localhost:7281/api/checklists';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('tokenApi');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  get() {
    return this.http.get<Checklist[]>(this.apiurl, {
      headers: this.getAuthHeaders(),
    });
  }

  getById(id: number) {
    return this.http.get<Checklist>(`${this.apiurl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  create(checklist: Checklist) {
    return this.http.post<Checklist>(this.apiurl, checklist, {
      headers: this.getAuthHeaders(),
    });
  }

  update(id: number, checklist: Checklist) {
    return this.http.put(`${this.apiurl}/${id}`, checklist, {
      headers: this.getAuthHeaders(),
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.apiurl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
