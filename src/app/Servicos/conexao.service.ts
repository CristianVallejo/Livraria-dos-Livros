import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa o HttpClient para enviar a requisição
import { Observable } from 'rxjs';
import { conexao } from '../models/conexaoBanco'; // Importa o modelo de dados Conexao

@Injectable({
  providedIn: 'root' // Isso torna o serviço disponível em toda a aplicação
})
export class ConexaoService {

  private apiUrl = 'https://localhost:7281/api/Conexao/'; // URL base da API

  constructor(private http: HttpClient) { }

  // Função para enviar os dados de configuração da conexão
  configurarConexao(conexao: conexao): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}configurar`, conexao); // Envia a solicitação POST com os dados de conexão
  }

  // Função para obter a connection string configurada
  obterConexao(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}obter`); // Realiza a solicitação GET para obter a connection string
  }
}
